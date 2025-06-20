
import React from 'react';
// Note: This library would need to be installed in a real project (npm install qrcode.react @types/qrcode.react)
// If qrcode.react is not available in the execution environment, this component will not render.
// For the purpose of this template, we assume it can be dynamically loaded or is available.
// If not, a placeholder image would be an alternative.
import { QRCodeSVG } from 'qrcode.react'; 

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 160, // Increased size for better readability
  bgColor = "#FFFFFF",
  fgColor = "#3A5A40", // Deep Green for QR code
}) => {
  // Fallback if QRCodeSVG component is not available (e.g., library not loaded)
  if (typeof QRCodeSVG !== 'function') {
    console.warn("QRCodeSVG component not loaded, using fallback image.");
    return (
        <div className="p-4 bg-white inline-block rounded-lg shadow-lg border border-rose-gold">
            <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=FFFFFF&color=3A5A40`} 
                alt="RSVP QR Code" 
                width={size} 
                height={size}
            />
            <p className="text-xs text-center mt-2 text-slate-500">QR by qrserver.com</p>
        </div>
    );
  }
  
  return (
    <div className="p-4 bg-white inline-block rounded-lg shadow-xl border border-rose-gold">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level="H" // Error correction level: High
        includeMargin={true}
      />
    </div>
  );
};

export default QRCodeDisplay;