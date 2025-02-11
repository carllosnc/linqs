import { LogoHorizontal, LogoVertical } from "@/components/logo"
import Link from "next/link"

export default async function Privacy(){
  return (
    <main className="flex privacy flex-col justify-center items-center px-[20px] py-[40px]">
      <section className="flex flex-col items-start justify-start gap-[30px] w-full max-w-[600px]">

        <LogoVertical className="w-[110px] h-auto fill-black dark:fill-white" />

        <Link href="/" className="link-color">
          Back to home →
        </Link>

        <hr className="border-1 border-color w-full" />

        <h1>Privacy Policy for Linqs</h1>

        <p>
          <strong>Effective Date:</strong> <span> 11/02/2025 </span>
        </p>

        <p>
          Thank you for using Linqs, the app designed to help you save and organize your favorite websites. At Linqs, we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, store, and protect your information when you use our app.
        </p>

        <p>
          By using Linqs, you agree to the terms of this Privacy Policy. If you do not agree with these terms, please do not use the app.
        </p>

        <h2>1. Information We Collect</h2>

        <h3>a. Information You Provide</h3>

        <ul>
            <li>
              <strong>Account Information</strong>:
              When you create an account, we may collect your name, email address, and password.
            </li>
            <li>
              <strong>Saved Links</strong>:
              We collect the URLs, titles, and any tags or notes you add to your saved websites.
            </li>
            <li>
              <strong>Preferences</strong>:
              We may collect information about your preferences and settings within the app.
            </li>
        </ul>

        <h3>b. Automatically Collected Information</h3>

        <ul>
            <li>
              <strong>Usage Data</strong>:
              We collect information about how you interact with the app, such as the features you use, the time spent on the app, and any errors or crashes.
            </li>
            <li>
              <strong>Device Information</strong>:
              We may collect information about your device, including the device type, operating system, unique device identifiers, and mobile network information.
            </li>
            <li>
              <strong>Location Data</strong>:
              With your consent, we may collect your approximate location based on your IP address or GPS data.
            </li>
        </ul>

        <h3>c. Third-Party Information</h3>

        <ul>
          <li>
            <strong>Social Media Logins</strong>:
            If you choose to log in via a third-party service (e.g., Google, Apple), we may receive your name, email address, and profile picture from that service.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>

        <p>We use the information we collect for the following purposes:</p>

        <ul>
            <li>
              <strong>To Provide and Improve the App</strong>: We use your information to operate, maintain, and enhance the features and functionality of Linqs.
            </li>
            <li>
              <strong>To Personalize Your Experience</strong>: We use your preferences and saved links to tailor the app to your needs.
            </li>
            <li>
              <strong>To Communicate with You</strong>: We may send you updates, security alerts, and support messages related to the app.
            </li>
            <li>
              <strong>To Analyze Usage</strong>: We use usage data to understand how the app is being used and to improve its performance.
            </li>
            <li>
              <strong>To Protect the App</strong>: We use information to detect and prevent fraud, abuse, and security issues.
            </li>
        </ul>

        <h2>3. How We Share Your Information</h2>

        <p>We do not sell your personal information. However, we may share your information in the following circumstances:</p>

        <ul>
            <li><strong>With Your Consent</strong>: We may share your information if you give us explicit permission to do so.</li>
            <li><strong>With Service Providers</strong>: We may share your information with third-party service providers who help us operate the app (e.g., hosting, analytics, customer support).</li>
            <li><strong>For Legal Reasons</strong>: We may disclose your information if required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.</li>
            <li><strong>In Case of a Merger or Sale</strong>: If Linqs is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2>4. Data Security</h2>

        <p>We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.</p>

        <h2>5. Your Choices and Rights</h2>

        <ul>
            <li><strong>Access and Update Your Information</strong>: You can access and update your account information within the app.</li>
            <li><strong>Delete Your Account</strong>: You can delete your account at any time, which will remove your saved links and personal information from our systems.</li>
            <li><strong>Opt-Out of Communications</strong>: You can opt-out of receiving non-essential communications from us.</li>
            <li><strong>Location Data</strong>: You can disable location tracking in your device settings.</li>
        </ul>

        <h2>6. Children’s Privacy</h2>

        <p>Linqs is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.</p>

        <h2>7. International Users</h2>

        <p>If you are using Linqs from outside the country where our servers are located, your information may be transferred to and processed in that country. By using the app, you consent to this transfer.</p>

        <h2>8. Changes to This Privacy Policy</h2>

        <p>We may update this Privacy Policy from time to time. If we make significant changes, we will notify you through the app or by email. Your continued use of Linqs after any changes constitutes your acceptance of the updated Privacy Policy.</p>

        <h2>9. Contact Us</h2>

        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>

        <p><strong>Email</strong>:
          <span> Carllos.nc@gmail.com </span>
        </p>

        <p>Thank you for trusting Linqs with your favorite websites! We are dedicated to providing you with a secure and enjoyable experience.</p>
      </section>
    </main>
  )
}