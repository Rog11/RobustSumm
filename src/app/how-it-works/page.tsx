// pages/docs.tsx
import Link from "next/link";
import SideBar from "../SideBar";
import Image from "next/image";

const How: React.FC = () => {
  return (
    <div className="px-60 flex">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">
          Framework of Adversarial Perturbations
        </h1>
        <Image
          src="/images/framework.jpg"
          alt="Framework of adversarial Perturbations"
          className="mt-4"
          width={1200}
          height={900}
        />
        <p>
          Character Swapping, Deletion and Insertion: The main motivation
          behind applying these perturbations is that they can be used to
          simulate common typo errors and input noise that can occur in
          real-world scenarios. We test the models’ resilience by
          assessing its ability to correct or accommodate such variations in
          summarization.
        </p>
      </div>
    </div>
  );
};

export default How;
