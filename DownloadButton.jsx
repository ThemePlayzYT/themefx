import { DownloadIcon } from './icons.jsx';

/* Downloads the original 4K source file from /public/downloads. The website preview is never used for downloads. */
export default function DownloadButton({ file }) {
  return (
    <a className="btn btn-primary download-btn" href={`/downloads/${file}`} download={file}>
      <DownloadIcon />
      <span>Download 4K MP4</span>
    </a>
  );
}
