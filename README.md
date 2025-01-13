# Installation Instructions for Smart Office

Thank you for participating in the beta release of Smart Office. Please follow the instructions below to install the application on your operating system.

## Downloading the Latest Release

1. Visit the [Releases page](https://github.com/smart-office-uz/desktop-app/releases) on GitHub.
2. Locate the latest release at the top of the page.
3. Download the appropriate binary for your operating system:
   - **macOS**: `.dmg`
   - **Windows**: `.exe`
   - **Linux**: `.AppImage`, `.deb`, or `.rpm`

## Installation Instructions

### macOS

1. **Download** the `.dmg` file from the latest release.
2. **Open** the downloaded `.dmg` file by double-clicking it.
3. **Drag and drop** the application into your Applications folder.
4. **Eject** the `.dmg` file after the app is copied.
5. **Run the application** by finding it in your Applications folder and double-clicking it. You may need to bypass Gatekeeper by right-clicking the app, selecting "Open," and confirming that you want to run it.

### Windows

1. **Download** the `.exe` file from the latest release.
2. **Run the executable** by double-clicking the `.exe` file.
3. Follow the on-screen instructions to complete the installation.
4. **Optional**: For easier access, you can create a shortcut to the executable on your desktop or pin it to the taskbar.

### Linux

You can choose from one of the following formats for installation:

#### AppImage

1. **Download** the `.AppImage` file from the latest release.
2. **Open a terminal** and navigate to the directory where the file was downloaded.
3. Make the AppImage executable with the following command:

   ```bash
   chmod +x .AppImage
   ```

#### Debian Package

1.  **Download** the `.deb` file from the latest release.
2.  **Open a terminal** and navigate to the extracted directory.
3.  **Install** the `.deb` file using the following command:

    ```bash
    sudo apt install ./data.deb
    ```

4.  **Remove** the extracted directory.

#### RPM Package

1.  **Download** the `.rpm` file from the latest release.
2.  **Open a terminal** and navigate to the extracted directory.
3.  **Install** the `.rpm` file using the following command:

    ```bash
    sudo dnf install ./data.rpm
    ```

4.  **Remove** the extracted directory.

## Troubleshooting

If you encounter any issues during the installation process, please feel free to open an issue on the [GitHub repository](https://github.com/smart-office-uz/desktop-app/issues).
