export default function getWindowAndDocumentHeight() {
  const hasWindow = typeof window !== 'undefined';

  const documentHeight = hasWindow ? window.document.body.offsetHeight : null;
  const windowHeight = hasWindow ? window.innerHeight : null;

  return {
    documentHeight,
    windowHeight,
  };
}
