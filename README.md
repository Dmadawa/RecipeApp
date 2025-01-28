### iOS Code Signing Setup

To enable code signing for iOS builds, the following certificates and provisioning profiles need to be set up:

1. **Certificates**:
   - **Development Certificate**: Required for running the app on physical devices during development.
   - **Distribution Certificate**: Required for submitting the app to the App Store.

2. **Provisioning Profiles**:
   - **Development Profile**: Links the App ID (e.g., `com.recipeapp.dev`) with the development certificate.
   - **Distribution Profile**: Links the App ID (e.g., `com.recipeapp`) with the distribution certificate.

3. **App IDs**:
   Unique App IDs need to be created for each environment:
   - Development: `com.recipeapp.dev`
   - Production: `com.recipeapp`
   - Staging: `com.recipeapp.staging`

To set this up, you need access to a paid Apple Developer Account.

### Android Code Signing Setup

To enable code signing for Android builds, the following steps are required:

1. **Keystores**:
   - Generate a keystore for each environment:
     - **Development Keystore**: Used for creating development builds.
     - **Production Keystore**: Used for creating production builds.

   Use the following command to generate a keystore:
   ```bash
   keytool -genkeypair -v -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -keystore <keystore-name>.jks -alias <key-alias>

