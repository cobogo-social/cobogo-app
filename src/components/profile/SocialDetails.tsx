import BackIcon from '@components/icons/BackIcon';
import CloseIcon from '@components/icons/CloseIcon';
import LinkIcon from '@components/icons/LinkIcon';
import SkipIcon from '@components/icons/SkipIcon';
import { motion } from 'framer-motion';
import numeral from 'numeral';

interface SocialDetailsProps {
  backStep: () => void;
  skipStep: () => void;
  closeStep: () => void;
  placeholder1: string;
  placeholder2: string;
  placeholder3: string;
  placeholder4: string;
  placeholder5: string;
  placeholder6?: string;
  number1: number;
  number2: number;
  number3: number;
  number4: number;
  number5: number;
  number6?: number;
  step: number;
  title: string;
  linkPlaceholder: string;
  link: string;
  icon: JSX.Element;
}

export default function SocialDetails(props: SocialDetailsProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex w-full px-[150px] py-[70px] relative justify-center items-center"
    >
      <div className="flex absolute top-[74px] right-[152px] gap-5">
        <div
          onClick={props.step !== 1 ? props.backStep : null}
          className="flex w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5 hover:cursor-pointer"
        >
          <BackIcon size={10} disabled={props.step === 1} />
        </div>

        <div
          onClick={props.skipStep}
          className="flex hover:cursor-pointer w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5"
        >
          <SkipIcon size={10} disabled={props.step === 4} />
        </div>

        <div
          onClick={props.closeStep}
          className="flex hover:cursor-pointer w-[39px] h-[35px] justify-center items-center border-[2px] border-gray5"
        >
          <CloseIcon size={16} />
        </div>
      </div>

      <div className="flex max-w-[1000px] w-full justify-between items-center">
        <div className="flex flex-col w-full">
          <div className="flex w-full">
            <div className="mr-[20px] flex">{props.icon}</div>

            <div className="flex flex-col">
              <p className="font-bold text-[22px]">{props.title}</p>

              {props.link && (
                <a
                  target="_blank"
                  href={props.link}
                  className="font-bold text-blue flex items-center gap-[5px]"
                  rel="noreferrer"
                >
                  {props.linkPlaceholder} <LinkIcon size={15} />
                </a>
              )}
            </div>
          </div>

          <div className="flex justify-around items-start w-full mt-[70px]">
            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {String(props.number1).length > 3
                  ? numeral(Number(props.number1)).format('0.00a').toUpperCase()
                  : props.number1}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                {props.placeholder1}
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {String(props.number2).length > 3
                  ? numeral(Number(props.number2)).format('0.00a').toUpperCase()
                  : props.number2}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                {props.placeholder2}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {String(props.number3).length > 3
                  ? numeral(Number(props.number3)).format('0.0a').toUpperCase()
                  : props.number3}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                {props.placeholder3}
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {String(props.number4).length > 3
                  ? numeral(Number(props.number4)).format('0.0a').toUpperCase()
                  : props.number4}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                {props.placeholder4}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {String(props.number5).length > 3
                  ? numeral(Number(props.number5)).format('0.0a').toUpperCase()
                  : props.number5}
              </p>

              <p className="text-[18px] font-bold text-gray6 mb-[60px]">
                {props.placeholder5}
              </p>

              <p className="text-[60px] font-bold leading-[25px] mb-[10px]">
                {props.number6 || props.placeholder6
                  ? String(props.number6).length > 3
                    ? numeral(Number(props.number6))
                        .format('0.0a')
                        .toUpperCase()
                    : props.number6
                  : '-'}
              </p>

              <p className="text-[18px] font-bold text-gray6">
                {props.placeholder6}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
