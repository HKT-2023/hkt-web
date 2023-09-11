import html2canvas from "html2canvas";

export const captureElement = async (element: any) => {
  const canvas = await html2canvas(element);
  return canvas.toDataURL("image/png", 2.0);
};
