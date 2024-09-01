import React from "react";
import Dialog from "react-native-dialog";
import DialogContainer from "react-native-dialog/lib/Container";
import RNFS from "react-native-fs";
import RNApkInstaller from "@dominicvonk/react-native-apk-installer";
export default function DownloadProgress({downloadState}) {
  return (
    <DialogContainer visible={downloadState.visible}>
      <Dialog.Title>Downloading</Dialog.Title>
      <Dialog.Description>
        Progress: {parseInt(downloadState.progress, 10)}%
      </Dialog.Description>
    </DialogContainer>
  );
}
