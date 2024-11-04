import { invoke } from "@tauri-apps/api/core";

export async function updateAppIcon(count?: number) {
  try {
    const { rgba, height, width } = count
      ? await createAppIcon(count)
      : await createAppIcon();
    await invoke("update_tray_icon", {
      rgba,
      width,
      height,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function createAppIcon(count?: number) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;

  const iconSize = 64; // Example icon size; adjust if different
  canvas.width = iconSize;
  canvas.height = iconSize;

  const baseImage = (await loadImage(
    "/smart-office-logo.png",
  )) as CanvasImageSource;
  context.drawImage(baseImage, 0, 0, iconSize, iconSize);

  const badgeRadius = 12;
  const badgeX = iconSize - badgeRadius - 5;
  const badgeY = badgeRadius + 5;

  if (count) {
    context.beginPath();
    context.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();

    context.fillStyle = "white";
    context.font = "14px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(count), badgeX, badgeY);
  }

  const imageData = context.getImageData(0, 0, iconSize, iconSize);

  return {
    rgba: Array.from(imageData.data), // Convert Uint8ClampedArray to regular array
    width: iconSize,
    height: iconSize,
  };
}

// Helper function to load an image
function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
