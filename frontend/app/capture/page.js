"use client";
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from '@vladmandic/face-api';
import * as tf from "@tensorflow/tfjs";
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Camera, RefreshCw, Upload, CheckCircle } from 'lucide-react';

export default function CaptureClassroom() {
  const router = useRouter();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null); // { count, imageBase64 }
  const [error, setError] = useState(null);

  const { admin } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const loadModels = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();
      } catch (error) {
        console.warn("WebGL failed, switching to CPU backend");
        await tf.setBackend("cpu");
        await tf.ready();
      }

      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        if (isMounted) setModelsLoaded(true);
      } catch (err) {
        console.error("Error loading models", err);
        if (isMounted) setError("Failed to load AI models. Check console.");
      }
    };
    loadModels();

    return () => { isMounted = false; };
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const captureAndDetect = async () => {
    if (!modelsLoaded || !webcamRef.current) return;

    setIsCapturing(true);
    setError(null);
    setResult(null);

    try {
      // Clear previous canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let maxCount = 0;
      let bestFrameBase64 = null;
      let bestDetections = null;

      // Capture 3 frames with 300ms interval to find best accuracy
      for (let i = 0; i < 3; i++) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc) continue;

        const img = new Image();
        img.src = imageSrc;
        await new Promise(resolve => { img.onload = resolve });

        // Run detection
        const detections = await faceapi.detectAllFaces(img, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
          .withFaceLandmarks();

        if (detections.length >= maxCount) {
          maxCount = detections.length;
          bestFrameBase64 = imageSrc;
          bestDetections = detections;
        }

        await new Promise(resolve => setTimeout(resolve, 300));
      }

      if (bestFrameBase64) {
        setResult({ count: maxCount, imageBase64: bestFrameBase64 });
        drawDetections(bestDetections);
      } else {
        setError("Failed to capture image from webcam.");
      }

    } catch (err) {
      console.error(err);
      setError("Error during face detection.");
    } finally {
      setIsCapturing(false);
    }
  };

  const drawDetections = (detections) => {
    if (!canvasRef.current || !webcamRef.current || !webcamRef.current.video) return;

    const displaySize = {
      width: webcamRef.current.video.videoWidth,
      height: webcamRef.current.video.videoHeight
    };

    const canvas = canvasRef.current;
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    const resizedDetections = faceapi.resizeResults(detections, displaySize);

    // Draw bounding boxes
    faceapi.draw.drawDetections(canvas, resizedDetections);
  };

  const uploadCapture = async () => {
    if (!result) {
      setError("No capture to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5000/api/captures', {
        studentCount: result.count,
        imageBase64: result.imageBase64
      }, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin?.token || ''}` 
        }
      });

      alert('Capture uploaded successfully!');
      setResult(null); // Reset after upload
      router.push("/dashboard");
      router.refresh(); // Force Next.js cache invalidation

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload to server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Classroom Capture</h1>
        <p className="text-gray-500 mt-1">AI-powered facial detection to count students.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
          {!modelsLoaded && (
            <div className="absolute inset-0 bg-gray-900/10 z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-3">
                <RefreshCw className="animate-spin text-blue-600 w-6 h-6" />
                <span className="font-medium text-gray-700">Loading AI Models...</span>
              </div>
            </div>
          )}

          <div className="relative aspect-video bg-black">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.8}
              videoConstraints={videoConstraints}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
            />
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button
              onClick={captureAndDetect}
              disabled={!modelsLoaded || isCapturing}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {isCapturing ? <RefreshCw className="animate-spin" size={20} /> : <Camera size={20} />}
              <span>{isCapturing ? 'Analyzing Frames...' : 'Analyze Classroom'}</span>
            </button>

            {error && (
              <div className="text-red-500 font-medium">{error}</div>
            )}
          </div>
        </div>

        {/* Results Sidebar */}
        <div className="w-full xl:w-96">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={24} />
              Detection Results
            </h2>

            {result ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                  <p className="text-blue-600 font-semibold mb-1">Students Detected</p>
                  <p className="text-6xl font-black text-blue-700">{result.count}</p>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-gray-700">Snapshot Preview</p>
                  <img src={result.imageBase64} alt="Snapshot" className="rounded-xl border border-gray-200 w-full object-cover aspect-video" />
                </div>

                <button
                  onClick={uploadCapture}
                  disabled={isUploading}
                  className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {isUploading ? <RefreshCw className="animate-spin" size={20} /> : <Upload size={20} />}
                  <span>{isUploading ? 'Uploading to Cloud...' : 'Save & Upload'}</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                <Camera size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium">No capture yet.</p>
                <p className="text-sm mt-1">Click analyze to begin detection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
