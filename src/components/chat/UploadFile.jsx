import "./UploadedFile.css";

function UploadedFile({
  selectedFile,
  uploadingFile,
  documentStatus,
  statusError,
  onRemove,
}) {
  if (!selectedFile) return null;

  return (
    <div className="selectedFile">
      <div className="fileInfo">
        <i className="fa-solid fa-file-pdf"></i>

        <div className="fileDetails">
          <span>{selectedFile.name}</span>

          {uploadingFile ? (
            <small>Uploading PDF...</small>
          ) : documentStatus ? (
            <small className={`documentStatus ${documentStatus}`}>
              {documentStatus === "queued" && "Waiting in queue..."}
              {documentStatus === "processing" && "Processing PDF..."}
              {documentStatus === "completed" && "Document ready"}
              {documentStatus === "failed" && "Processing failed"}
            </small>
          ) : null}
        </div>
      </div>

      {!uploadingFile && (
        <button
          type="button"
          className="removeFile"
          onClick={onRemove}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}

      {statusError && (
        <small className="statusError">{statusError}</small>
      )}
    </div>
  );
}

export default UploadedFile;
