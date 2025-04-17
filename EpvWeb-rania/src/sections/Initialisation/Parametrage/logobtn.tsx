import React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

// Styled hidden input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Component props
interface UploadButtonProps {
  onChange: (files: File[]) => void;
  label?: string;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
}

// UploadButton component
const UploadButton: React.FC<UploadButtonProps> = ({
  onChange,
  label = 'Importer Logo',
  multiple = false,
  accept = '*/*',
  maxFiles = 1,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files).slice(0, maxFiles);
      onChange(files);
      // Reset input value to allow selecting the same file again
      event.target.value = '';
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {label}
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
        multiple={multiple || maxFiles > 1}
        accept={accept}
      />
    </Button>
  );
};

export default UploadButton;