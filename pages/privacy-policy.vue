<template>
  <div id="app" class="main-box">
    <HeaderGlobal :isshowAiimage="false"></HeaderGlobal>

    <div class="p-6 prose mx-auto div-markdown-color">
      <h1>Privacy Policy for Easy4cut</h1>
      <p>Effective Date: July 6, 2025</p>
      <p>
        Welcome to Easy4cut, your trusted online platform for image cropping and
        editing. This privacy policy outlines the types of information we
        collect from our users, how we use it, and the steps we take to protect
        it.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        <strong>a. Uploaded Images</strong>: When you use our image cropping
        service, we temporarily process the images you upload to our servers.
        These images are automatically deleted after processing and are not
        stored permanently.
      </p>
      <p>
        <strong>b. Usage Data</strong>: We collect non-personal data about how
        you interact with our service, including the types of crops performed,
        preferred output formats, and general usage patterns to improve our
        service.
      </p>
      <p>
        <strong>c. Technical Information</strong>: We automatically collect
        certain technical information such as your IP address, browser type, and
        device information for security and analytics purposes.
      </p>

      <h2>2. Use of Your Information</h2>
      <p>
        The information we collect is used solely to provide and improve our
        image cropping service. Your uploaded images are processed in real-time
        and are not stored, shared, or used for any other purpose. We do not
        sell or share your data with third parties.
      </p>

      <h2>3. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data
        during transmission and processing. All image processing occurs over
        secure HTTPS connections, and we regularly audit our systems for
        vulnerabilities.
      </p>

      <h2>4. Children's Privacy</h2>
      <p>
        Easy4cut is intended for general audiences. While we do not specifically
        target children, our service may be used by individuals of all ages. We
        do not knowingly collect personal information from children under 13.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to request information about the data we hold about
        you. Since we do not store your processed images, there is no need to
        request deletion of image data.
      </p>

      <h2>6. Updates to This Privacy Policy</h2>
      <p>
        We may update this privacy policy to reflect changes in our practices.
        Significant changes will be notified on our website.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about our privacy practices, please contact us
        at: support@easy4cut.xyz
      </p>

      <p>
        Thank you for using Easy4cut - your simple online image cropping tool.
      </p>
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
//   min-height: 100vh;
//   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #fff;
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
strong {
  font-weight: 600;
}
.p-6 {
  padding: 1.5rem;
}
.mx-auto {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.mt-6 {
  margin-top: 1.5rem;
}
.-z-10 {
  z-index: -10;
}
.top-0 {
  top: 0;
}
.right-0 {
  right: 0;
}
.left-0 {
  left: 0;
}
.bottom-auto {
  bottom: auto;
}
.absolute {
  position: absolute;
}
.h-full {
  height: 100%;
}
.my-8 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.p-6 {
  padding: 1.5rem;
}
.prose :where(p):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
p,
h1,
h2 {
  text-align: left;
}
@media (min-width: 344px) and(max-width: 1285px) {
  .main-box {
    background-color: #2b2f3a;
    min-height: 100vh;
    font-size: 23px;
  }
}
</style>
