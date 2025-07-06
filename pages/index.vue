<template>
  <div class="image-cropper-container main-box" id="app">
    <client-only>
      <HeaderGlobal></HeaderGlobal>

      <!-- Header Section -->
      <div class="header-section">
        <h1 class="main-title">Professional Image Cropper Online</h1>
        <p class="subtitle">
          Transform your photos with our advanced
          <strong>picture cropper</strong> tool. Whether you need a
          <strong>photo cropper</strong>, <strong>avatar cropper</strong>, or
          specialized <strong>circle image cropper</strong>, our platform
          provides everything you need for perfect image editing.
        </p>

        <div class="features-grid">
          <div class="feature-card">
            ✅ Free <strong>online image cropper</strong>
          </div>
          <div class="feature-card">✅ No registration required</div>
          <div class="feature-card">✅ Support all image formats</div>
          <div class="feature-card">✅ High-quality output</div>
        </div>
      </div>

      <!-- Main Cropper Section -->
      <div class="cropper-section">
        <div class="upload-area" v-if="!imageUrl" @click="triggerFileInput">
          <div class="upload-content">
            <div class="upload-icon">📷</div>
            <h3>Upload Your Image</h3>
            <p>
              Click here to select an image for our <strong>img cropper</strong>
            </p>
            <p>Supports JPG, PNG, WEBP formats</p>
          </div>
          <input
            ref="fileInput"
            type="file"
            @change="handleFileSelect"
            accept="image/*"
            style="display: none"
          />
        </div>

        <!-- Cropper Interface -->
        <div v-if="imageUrl" class="cropper-interface">
          <ClientOnly>
            <div
              class="cropper-wrapper"
              :class="{ 'circle-mode': selectedMode === 'circle' }"
            >
              <vue-cropper
                v-if="showCropper"
                ref="cropper"
                :img="imageUrl"
                :outputSize="cropperOptions.outputSize"
                :outputType="cropperOptions.outputType"
                :autoCrop="cropperOptions.autoCrop"
                :autoCropWidth="cropperOptions.autoCropWidth"
                :autoCropHeight="cropperOptions.autoCropHeight"
                :fixed="cropperOptions.fixed"
                :fixedNumber="cropperOptions.fixedNumber"
                :full="cropperOptions.full"
                @realTime="realTime"
                @imgLoad="imgLoad"
                :can-move="cropperOptions.canMove"
                :can-move-box="cropperOptions.canMoveBox"
              ></vue-cropper>
            </div>
          </ClientOnly>
          <!-- Control Panel -->
          <div class="control-panel">
            <h3>Cropper Settings</h3>

            <div class="control-group">
              <label>Crop Mode:</label>
              <select v-model="selectedMode" @change="updateCropMode">
                <option value="free">Free Crop</option>
                <option value="1:1">Square (1:1)</option>
                <option value="16:9">Widescreen (16:9)</option>
                <option value="4:3">Standard (4:3)</option>
                <option value="circle">Circle Crop</option>
              </select>
            </div>

            <div class="control-group">
              <label>Output Format:</label>
              <select v-model="cropperOptions.outputType">
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            <div class="control-group">
              <label>Quality:</label>
              <input
                type="range"
                v-model="cropperOptions.outputSize"
                min="0.1"
                max="1"
                step="0.1"
                class="quality-slider"
              />
              <span>{{ Math.round(cropperOptions.outputSize * 100) }}%</span>
            </div>

            <div class="button-group">
              <button @click="rotateLeft" class="control-btn">
                ↺ Rotate Left
              </button>
              <button @click="rotateRight" class="control-btn">
                ↻ Rotate Right
              </button>
              <button @click="flipHorizontal(1)" class="control-btn">
                ⟷ Flip H
              </button>
              <button @click="flipHorizontal(-1)" class="control-btn">
                ⟷ Flip V
              </button>
            </div>

            <div class="action-buttons">
              <button @click="resetCropper" class="reset-btn">Reset</button>
              <button @click="cropImage" class="crop-btn">
                Crop & Download
              </button>
              <button @click="triggerFileInput" class="crop-btn">
                Reupload
              </button>
              <input
                ref="fileInput"
                type="file"
                @change="handleFileSelect"
                accept="image/*"
                style="display: none"
              />
            </div>
          </div>
        </div>

        <!-- Preview Section -->
        <div v-if="previewUrl" class="preview-section">
          <h3>Preview</h3>
          <div class="preview-container">
            <img
              :src="previewUrl"
              alt="Cropped preview"
              class="preview-image"
            />
          </div>
        </div>
      </div>

      <!-- Image Comparison Showcase -->
      <div class="image-showcase">
        <h2>See the Magic of Easy4cut</h2>
        <div class="comparison-groups">
          <div class="comparison-group">
            <div class="original-image">
              <img
                src="/assets/image/sample/easy4cutori1.jpg"
                alt="Original Image"
              />
            </div>
            <div class="arrow-icon">
              <i class="fas fa-arrow-down"></i>
            </div>
            <div class="cropped-image">
              <img
                src="/assets/image/sample/easy4cutupt1.jpg"
                alt="Cropped Image"
              />
            </div>
          </div>
          <div class="comparison-group">
            <div class="original-image">
              <img
                src="/assets/image/sample/easy4cutori2.jpg"
                alt="Original Image"
              />
            </div>
            <div class="arrow-icon">
              <i class="fas fa-arrow-down"></i>
            </div>
            <div class="cropped-image">
              <img
                src="/assets/image/sample/easy4cutupt2.jpg"
                alt="Cropped Image"
              />
            </div>
          </div>
          <div class="comparison-group">
            <div class="original-image">
              <img
                src="/assets/image/sample/easy4cutori3.jpg"
                alt="Original Image"
              />
            </div>
            <div class="arrow-icon">
              <i class="fas fa-arrow-down"></i>
            </div>
            <div class="cropped-image">
              <img
                src="/assets/image/sample/easy4cutupt3.jpg"
                alt="Cropped Image"
              />
            </div>
          </div>
          <div class="comparison-group">
            <div class="original-image">
              <img
                src="/assets/image/sample/easy4cutori4.png"
                alt="Original Image"
              />
            </div>
            <div class="arrow-icon">
              <i class="fas fa-arrow-down"></i>
            </div>
            <div class="cropped-image">
              <img
                src="/assets/image/sample/easy4cutupt4.jpg"
                alt="Cropped Image"
              />
            </div>
          </div>
          <div class="comparison-group">
            <div class="original-image">
              <img
                src="/assets/image/sample/easy4cutori5.png"
                alt="Original Image"
              />
            </div>
            <div class="arrow-icon">
              <i class="fas fa-arrow-down"></i>
            </div>
            <div class="cropped-image">
              <img
                src="/assets/image/sample/easy4cutupt5.jpg"
                alt="Cropped Image"
              />
            </div>
          </div>
          <div class="comparison-group">
            <div class="original-image">
              <img
                src="/assets/image/sample/easy4cutori6.png"
                alt="Original Image"
              />
            </div>
            <div class="arrow-icon">
              <i class="fas fa-arrow-down"></i>
            </div>
            <div class="cropped-image">
              <img
                src="/assets/image/sample/easy4cutupt6.jpg"
                alt="Cropped Image"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Features Description -->
      <div class="features-description">
        <h2>Why Choose Our Online Cropper?</h2>

        <div class="feature-details">
          <div class="feature-item">
            <h3>🎯 Precise Picture Cropper</h3>
            <p>
              Our advanced <strong>photo cropper online</strong> provides
              pixel-perfect accuracy for all your image editing needs. Whether
              you're creating social media content or professional materials,
              our <strong>free image cropper</strong> delivers exceptional
              results every time.
            </p>
          </div>

          <div class="feature-item">
            <h3>🔄 Versatile Cropper Image Tools</h3>
            <p>
              From basic rectangular crops to specialized
              <strong>avatar cropper</strong>
              functionality, our platform supports multiple cropping modes. The
              <strong>circle image cropper</strong> feature is perfect for
              profile pictures and social media avatars.
            </p>
          </div>

          <div class="feature-item">
            <h3>⚡ Fast Online Image Cropper</h3>
            <p>
              Experience lightning-fast processing with our optimized
              <strong>online cropper</strong>. No software installation required
              - just upload, crop, and download. Our
              <strong>img cropper</strong> works seamlessly across all devices
              and browsers.
            </p>
          </div>

          <div class="feature-item">
            <h3>🎨 Professional PNG Cropper</h3>
            <p>
              Maintain transparency and quality with our specialized
              <strong>png cropper</strong>. Perfect for logos, graphics, and
              images that require transparent backgrounds. Our
              <strong>image cropper online</strong> preserves alpha channels and
              image quality.
            </p>
          </div>
        </div>
      </div>

      <!-- How to Use Section -->
      <div class="how-to-use">
        <h2>How to Use Our Image Cropper</h2>
        <div class="steps-container">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Upload Your Image</h4>
              <p>
                Click the upload area to select your image. Our
                <strong>picture cropper</strong> supports all common image
                formats including JPG, PNG, and GIF.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Adjust Crop Settings</h4>
              <p>
                Use our intuitive interface to set your preferred crop ratio.
                The
                <strong>photo cropper</strong> offers preset ratios or custom
                dimensions.
              </p>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Crop and Download</h4>
              <p>
                Preview your changes and download the cropped image. Our
                <strong>online image cropper</strong> maintains high quality in
                the output.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div class="faq-item">
          <h4>Is this image cropper online tool completely free?</h4>
          <p>
            Yes! Our <strong>free image cropper</strong> is completely free to
            use with no hidden costs or registration requirements. Crop
            unlimited images with our <strong>online cropper</strong> tool.
          </p>
        </div>

        <div class="faq-item">
          <h4>Can I use the avatar cropper for social media profiles?</h4>
          <p>
            Absolutely! Our <strong>avatar cropper</strong> and
            <strong>circle image cropper</strong> are specifically designed for
            creating perfect profile pictures for social media platforms.
          </p>
        </div>

        <div class="faq-item">
          <h4>What file formats does the img cropper support?</h4>
          <p>
            Our <strong>img cropper</strong> supports all major image formats
            including JPEG, PNG, GIF, and WebP. The
            <strong>png cropper</strong> feature maintains transparency for PNG
            files.
          </p>
        </div>

        <div class="faq-item">
          <h4>
            How does the cropper image quality compare to desktop software?
          </h4>
          <p>
            Our <strong>cropper image</strong> technology uses advanced
            algorithms to maintain the highest possible quality. The
            <strong>photo cropper online</strong> tool produces results
            comparable to professional desktop applications.
          </p>
        </div>
      </div>
      <FooterGlobal></FooterGlobal>
    </client-only>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useHead } from "#imports";
import HeaderGlobal from "@/components/headerglobal.vue";
import FooterGlobal from "@/components/footerglobal.vue";

const imageUrl = ref("");
const previewUrl = ref("");
const selectedMode = ref("free");
const showCropper = ref(false);
const fileInput = ref(null);
const cropper = ref(null);

const cropperOptions = ref({
  outputSize: 0.8,
  outputType: "jpeg",
  info: true,
  canScale: false, // 完全禁用缩放
  autoCrop: true,
  autoCropWidth: 300,
  autoCropHeight: 200,
  fixed: true, // 固定裁剪框
  fixedNumber: [1, 1],
  full: false,
  fixedBox: true, // 固定裁剪框大小
  canMove: true, // 禁用移动图片
  canMoveBox: true, // 禁用移动裁剪框
  original: false,
  centerBox: true, // 居中显示
  high: true,
  infoTrue: false,
  maxImgSize: 3000,
  enlarge: 1, // 禁止放大
  mode: "cover", // 覆盖模式
});

useHead({
  title: "Easy4cut-free online image cropper,Supports JPG, PNG, WEBP formats",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content:
        "Professional free image cropper online - crop photos instantly without software installation. Supports JPG, PNG, WEBP formats with preset ratios (1:1, 16:9, 4:3) and custom cropping. Perfect for social media, web design, and photo editing. 100% free, no watermarks.",
    },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: "https://ghibli.best/image-cropper" },
  ],
});

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
      nextTick(() => {
        showCropper.value = true;
      });
    };
    reader.readAsDataURL(file);
  }
};

const base64ToBlob = (base64, mimeType) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: mimeType });
};

const updateCropMode = () => {
  switch (selectedMode.value) {
    case "1:1":
      cropperOptions.value.fixed = true;
      cropperOptions.value.fixedNumber = [1, 1];
      break;
    case "16:9":
      cropperOptions.value.fixed = true;
      cropperOptions.value.fixedNumber = [16, 9];
      break;
    case "4:3":
      cropperOptions.value.fixed = true;
      cropperOptions.value.fixedNumber = [4, 3];
      break;
    case "circle":
      cropperOptions.value.fixed = true;
      cropperOptions.value.fixedNumber = [1, 1];
      cropperOptions.value.full = true;
      cropperOptions.value.centerBox = true;
      break;
    default:
      cropperOptions.value.fixed = false;
  }
  nextTick(() => {
    if (cropper.value) {
      cropper.value.refresh();
    }
  });
};

const rotateLeft = () => {
  if (cropper.value && cropper.value.rotateLeft) {
    cropper.value.rotateLeft();
  }
};

const rotateRight = () => {
  if (cropper.value && cropper.value.rotateRight) {
    cropper.value.rotateRight();
  }
};

const flipHorizontal = (num) => {
  if (cropper.value && cropper.value.changeScale) {
    cropper.value.changeScale(num);
  }
};

const resetCropper = async () => {
  try {
    if (cropper.value && cropper.value.refresh) {
      cropper.value.refresh();
    }
  } catch (error) {
    console.error("Failed to reset cropper:", error);
  }
};

const getMimeType = (outputType) => {
  const mimeTypes = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };
  return mimeTypes[outputType.toLowerCase()] || "image/png";
};

const getFileExtension = (outputType) => {
  const extensions = {
    jpeg: "jpg",
    jpg: "jpg",
    png: "png",
    webp: "webp",
  };
  return extensions[outputType.toLowerCase()] || "png";
};

const downloadBlob = (blob, isCircle = false) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  const extension = getFileExtension(cropperOptions.value.outputType);
  const prefix = isCircle ? "circle-cropped" : "cropped-image";
  link.download = `${prefix}-${Date.now()}.${extension}`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const cropImage = async () => {
  if (!imageUrl.value) {
    console.error("请等待图片加载完成");
    return;
  }

  if (selectedMode.value === "circle") {
    await cropCircleImage();
  } else {
    cropper.value.getCropBlob((blob) => {
      if (blob) {
        downloadBlob(blob);
      }
    });
  }
};

const cropCircleImage = () => {
  return new Promise((resolve, reject) => {
    cropper.value.getCropData((base64) => {
      if (!base64) {
        reject(new Error("获取裁剪数据失败"));
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;

        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const offsetX = (size - img.width) / 2;
        const offsetY = (size - img.height) / 2;
        ctx.drawImage(img, offsetX, offsetY);
        ctx.restore();

        const mimeType = getMimeType(cropperOptions.value.outputType);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              downloadBlob(blob, true);
              resolve();
            } else {
              reject(new Error("圆形裁剪失败"));
            }
          },
          mimeType,
          cropperOptions.value.outputSize
        );
      };

      img.onerror = () => reject(new Error("图片加载失败"));
      img.src = base64;
    });
  });
};

const imgLoad = (msg) => {
  console.log("Image loaded:", msg);
};

const realTime = (data) => {
  // Real-time preview updates
};
</script>
<style lang="less" scoped>
// .main-box {
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// }
.image-cropper-container {
  min-height: 100vh;
  // background: linear-gradient(135deg, #a8d5ba 0%, #7fb069 100%);
  padding: 20px;
  font-family: "Arial", sans-serif;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;

  .main-title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
    font-weight: bold;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #34495e;
    max-width: 800px;
    margin: 0 auto 30px;
    line-height: 1.6;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    max-width: 1000px;
    margin: 0 auto;

    .feature-card {
      background: rgba(255, 255, 255, 0.9);
      padding: 15px;
      border-radius: 10px;
      font-weight: 500;
      color: #2c3e50;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
}

.cropper-section {
  max-width: 1000px;
  margin: 0 auto;

  .upload-area {
    background: rgba(255, 255, 255, 0.95);
    border: 3px dashed #7fb069;
    border-radius: 20px;
    padding: 60px 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 1);
      border-color: #5d8a47;
    }

    .upload-content {
      .upload-icon {
        font-size: 4rem;
        margin-bottom: 20px;
      }

      h3 {
        color: #2c3e50;
        font-size: 1.8rem;
        margin-bottom: 15px;
      }

      p {
        color: #7f8c8d;
        font-size: 1.1rem;
        margin: 10px 0;
      }
    }
  }

  .cropper-interface {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin-top: 30px;

    .cropper-wrapper {
      background: white;
      border-radius: 15px;
      padding: 20px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      height: 500px;
      width: 100%;
      overflow: hidden;
      position: relative;
    }

    .cropper-wrapper ::v-deep .vue-cropper {
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: 0 auto;
    }

    /* 圆形裁剪框样式 - 仅在circle模式下生效 */
    .cropper-wrapper.circle-mode ::v-deep .cropper-view-box {
      outline: none;
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8),
        0 0 0 2px rgba(0, 0, 0, 0.5);
    }

    .cropper-wrapper.circle-mode ::v-deep .cropper-dashed {
      border: none;
    }

    .control-panel {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 15px;
      padding: 25px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

      h3 {
        color: #2c3e50;
        margin-bottom: 20px;
        font-size: 1.3rem;
      }

      .control-group {
        margin-bottom: 20px;

        label {
          display: block;
          color: #34495e;
          font-weight: 500;
          margin-bottom: 8px;
        }

        select,
        input {
          width: 100%;
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;

          &:focus {
            border-color: #7fb069;
            outline: none;
          }
        }

        .quality-slider {
          margin-right: 10px;
          width: calc(100% - 50px);
        }
      }

      .button-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 20px;

        .control-btn {
          padding: 8px 12px;
          background: #ecf0f1;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background 0.3s ease;

          &:hover {
            background: #d5dbdb;
          }
        }
      }

      .action-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;

        .reset-btn,
        .crop-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .reset-btn {
          background: #95a5a6;
          color: white;

          &:hover {
            background: #7f8c8d;
          }
        }

        .crop-btn {
          background: #7fb069;
          color: white;

          &:hover {
            background: #5d8a47;
          }
        }
      }
    }
  }

  .preview-section {
    display: none; /* 隐藏预览区域 */
  }
}

.features-description,
.how-to-use,
.faq-section {
  max-width: 1000px;
  margin: 60px auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2c3e50;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }
}

.feature-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;

  .feature-item {
    h3 {
      color: #7fb069;
      font-size: 1.3rem;
      margin-bottom: 15px;
    }

    p {
      color: #34495e;
      line-height: 1.6;
      font-size: 1rem;
    }
  }
}

.steps-container {
  .step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;

    .step-number {
      background: #7fb069;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.2rem;
      margin-right: 20px;
      flex-shrink: 0;
    }

    .step-content {
      h4 {
        color: #2c3e50;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      p {
        color: #34495e;
        line-height: 1.6;
      }
    }
  }
}

.faq-item {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ecf0f1;

  &:last-child {
    border-bottom: none;
  }

  h4 {
    color: #2c3e50;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  p {
    color: #34495e;
    line-height: 1.6;
  }
}

// Mobile Responsiveness
@media (max-width: 768px) {
  .header-section .main-title {
    font-size: 2rem;
  }

  .cropper-interface {
    grid-template-columns: 1fr;
  }

  .feature-details {
    grid-template-columns: 1fr;
  }

  .features-description,
  .how-to-use,
  .faq-section {
    margin: 40px 20px;
    padding: 25px;
  }
}

.image-showcase {
  max-width: 1000px;
  margin: 60px auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  h2 {
    color: #2c3e50;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
  }

  .comparison-groups {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    margin-top: 30px;

    .comparison-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;

      .original-image,
      .cropped-image {
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.02);
          }
        }
      }

      .arrow-icon {
        color: #7fb069;
        font-size: 2rem;
        animation: bounce 2s infinite;

        i {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
      }
    }
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// Strong text styling for keywords
// strong {
//   color: #7fb069;
//   font-weight: 600;
// }
</style>
