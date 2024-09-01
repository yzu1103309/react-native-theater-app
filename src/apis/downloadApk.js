import RNFS from 'react-native-fs';
import RNApkInstaller from '@dominicvonk/react-native-apk-installer';

export function downloadApk(fromUrl, filePath, setDownloadState) {
  RNFS.downloadFile({
    fromUrl: fromUrl,
    toFile: filePath,
    progress: res => {
      setDownloadState({
        visible: true,
        progress: 100 * (res.bytesWritten / res.contentLength).toFixed(2),
      });
    },
    progressDivider: 1,
  }).promise.then(result => {
    if (result.statusCode === 200) {
      RNApkInstaller.install(filePath);
    }
    setDownloadState({visible: false, progress: 0});
  });
}
