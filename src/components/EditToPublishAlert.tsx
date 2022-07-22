import Button from './Button';

interface EditToPublishAlertProps {
  openPublishProfileModal: () => void;
}

export default function EditToPublishAlert(props: EditToPublishAlertProps) {
  return (
    <div className="absolute z-10 border-2 border-red3 bg-black/75 hidden sm:flex items-center w-full max-w-[1010px] justify-between p-3 bottom-20 left-1/2 -translate-x-1/2">
      <div>
        <strong className="text-lg">profile not public.</strong>

        <p>
          click on the <strong>edit to publish</strong> button to add the
          minimum required information to make it public for everyone to see.
        </p>
      </div>

      <Button
        color="bg-orange"
        text="edit to publish"
        onClick={props.openPublishProfileModal}
      />
    </div>
  );
}
