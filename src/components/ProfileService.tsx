import Button from './Button';

export default function ProfileService() {
  return (
    <div className="w-[310px] h-[464px] border-[1px] border-gray10">
      <div className="bg-blue w-[310px] h-[204px]" />

      <div className="px-[30px] py-[40px]">
        <p className="text-[22px]">videos</p>

        <p className="mb-[30px]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem eat
          eres accusantium doloremque unde laudantium (...)
        </p>

        <Button
          color="bg-gray7"
          text="more info"
          borderColor="border-gray2"
          borderSize="border-[1px]"
          textColor="text-blue"
        />
      </div>
    </div>
  );
}
