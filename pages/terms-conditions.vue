<template>
  <div id="app" class="main-box">
    <HeaderGlobal :isshowAiimage="false"></HeaderGlobal>

    <div class="p-6 prose mx-auto div-markdown-color">
      <h1>Easy4cut Terms and Conditions</h1>
      <p><strong>Last Updated: July 6, 2025</strong></p>
      <p>
        Please read the following important terms and conditions before using
        our online image cropping services through this website.
      </p>

      <h2>1. General</h2>
      <ul>
        <li>
          1.1. These terms and conditions ("Terms") govern the use of image
          cropping services provided by Easy4cut ("Easy4cut", "we", "us",
          "our"). These Terms apply to all services accessed through our
          website.
        </li>
        <li>
          1.2. Our Website offers online image cropping tools that allow users
          to upload, crop and download images in various formats and aspect
          ratios. All image processing occurs in your browser and we do not
          permanently store your uploaded images.
        </li>
      </ul>

      <h2>2. How to Contact Us</h2>
      <ul>
        <li>
          2.1. For any inquiries or support related to our services, please
          contact us via email at support@easy4cut.xyz. We will respond to your
          inquiries as soon as possible.
        </li>
      </ul>

      <h2>3. About You</h2>
      <ul>
        <li>
          3.1. To use our services, you must be at least 13 years of age. By
          using our services, you confirm that you meet this age requirement.
        </li>
        <li>
          3.2. You are responsible for ensuring you have the necessary rights to
          upload and process any images through our service.
        </li>
      </ul>

      <h2>4. Service Description</h2>
      <ul>
        <li>
          4.1. Easy4cut provides an online tool for cropping and resizing
          images. The service is provided "as is" without warranties of any
          kind.
        </li>
        <li>
          4.2. We do not guarantee specific results from using our cropping
          tools. The quality of output depends on the input image and your
          selected cropping parameters.
        </li>
      </ul>

      <h2>5. Your Privacy</h2>
      <ul>
        <li>
          5.1. Your uploaded images are processed temporarily and automatically
          deleted after processing. We do not store your original or cropped
          images.
        </li>
        <li>
          5.2. We collect minimal usage data to improve our services, as
          detailed in our Privacy Policy.
        </li>
      </ul>

      <h2>6. Service Usage and Restrictions</h2>
      <ul>
        <li>
          6.1. You may use our services for personal and commercial purposes,
          provided you comply with these Terms.
        </li>
        <li>
          6.2. You may not use our services to process illegal or infringing
          content, or attempt to reverse engineer our tools.
        </li>
      </ul>

      <h2>7. Limitations of Liability</h2>
      <ul>
        <li>
          7.1. We are not liable for any loss or corruption of images during
          processing. You should maintain backups of your original files.
        </li>
        <li>
          7.2. Our maximum liability for any claims shall not exceed the amount
          you paid for our services (if any).
        </li>
      </ul>

      <h2>8. Changes to Terms</h2>
      <ul>
        <li>
          8.1. We may update these Terms from time to time. Continued use of our
          services constitutes acceptance of the updated Terms.
        </li>
      </ul>

      <h2>9. Governing Law</h2>
      <ul>
        <li>
          9.1. These Terms shall be governed by and construed in accordance with
          the laws of the jurisdiction where Easy4cut operates.
        </li>
      </ul>
    </div>
    <FooterGlobal></FooterGlobal>
  </div>
</template>

<script>
import HeaderGlobal from "@/components/headerglobal.vue";
import FooterGlobal from "@/components/footerglobal.vue";
export default {
  name: "",
  components: { HeaderGlobal, FooterGlobal },

  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
// .main-box {
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//   min-height: 100vh;
// }

.p-6 {
  padding: 1.5rem;
}
.prose {
  max-width: 65ch;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.div-markdown-color {
  color: #fff;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
}
h1 {
  color: #ffff;
  font-size: 2rem;
  margin-bottom: 1rem;
}
h2 {
  color: #fff;
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
p {
  margin-bottom: 1rem;
}
ul {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}
li {
  margin-bottom: 0.5rem;
}
strong {
  font-weight: 600;
}
@media (min-width: 344px) and(max-width: 1285px) {
  .main-box {
    background-color: #2b2f3a;
    min-height: 100vh;
    font-size: 23px;
  }
}
</style>
