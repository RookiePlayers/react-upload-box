import React from 'react';
interface OnUploadParams {
    file: string;
    blob: string;
    link: string;
}
interface UploadDivProps {
    image: string;
    viewOnly?: boolean;
    video?: boolean;
    sizeLimit?: number;
    border?: string;
    style?: React.CSSProperties;
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectFitPosition?: string;
    onUpload?: (file: OnUploadParams | File) => void;
    placeholder?: React.ReactNode;
    children?: React.ReactNode;
    disableLink?: boolean;
}
export declare const UploadDiv: React.FC<UploadDivProps>;
export {};
