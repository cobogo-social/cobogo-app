interface EditIconProps {
  size: number;
}

export default function EditIcon(props: EditIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill="#666"
        d="M14.678 3.183l3.289 3.455a.388.388 0 010 .528l-7.963 8.365-3.383.395c-.452.053-.835-.349-.784-.824l.376-3.554 7.962-8.365a.344.344 0 01.503 0zm5.906-.877L18.805.436a1.378 1.378 0 00-2.012 0l-1.29 1.357a.388.388 0 000 .528l3.288 3.455a.344.344 0 00.503 0l1.29-1.356a1.552 1.552 0 000-2.114zM14 13.256v3.9H2.333V4.898h8.378c.117 0 .226-.05.31-.134l1.459-1.532c.277-.291.08-.786-.31-.786H1.75C.784 2.447 0 3.271 0 4.286v13.482c0 1.015.784 1.838 1.75 1.838h12.833c.966 0 1.75-.823 1.75-1.838v-6.044c0-.41-.47-.613-.747-.326l-1.458 1.533a.484.484 0 00-.128.325z"
      />
    </svg>
  );
}
