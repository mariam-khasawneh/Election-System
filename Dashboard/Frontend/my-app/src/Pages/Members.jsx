import ButtonGroup from "../Components/ButtonGroup";

function Members() {
  const buttons = [
    { label: "جميع الاعضاء", id: 1, onClick: () => alert("جميع الأعضاء") },
    { label: "المرشحين", id: 2, onClick: () => alert("المرشحين") },
    { label: "المنتخبين", id: 3, onClick: () => alert("المنتخبين") },
  ];

  return (
    <div className="p-12 ">
      <ButtonGroup buttons={buttons} />
    </div>
  );
}

export default Members;
Members;
