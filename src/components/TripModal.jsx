"use client";

import React, { useState } from "react";

const TripModal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="absolute top-15 left-0 w-full h-full">
          <div className="container mx-auto max-w-xl h-[60vh] rounded-3xl bg-slate-800 py-6 px-4">
            <button
              className="btn mb-4 font-bold rounded-full bg-slate-600"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TripModal;
