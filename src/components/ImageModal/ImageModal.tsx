import { Modal } from "@mantine/core";
// @ts-ignore
import { MapInteractionCSS } from "react-map-interaction";
const ImageModal = ({
  url,
  opened,
  close,
  setImgUrl,
}: {
  url: string;
  opened: boolean;
  close: () => void;
  setImgUrl: (url: string) => void;
}) => {
  return (
    <Modal
      centered
      opened={opened && url.length > 0}
      size={"xl"}
      onClose={() => {
        setImgUrl("");
        close();
      }}
      title="Zoom in or out image"
    >
      <MapInteractionCSS>
        <img src={url} />
      </MapInteractionCSS>
    </Modal>
  );
};

export default ImageModal;
