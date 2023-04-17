import { Graphics } from "@/src-client/components/Graphics";
import ModalRegister from "@/src-client/components/Modals/Company/ModalRegister";
import NavBar from "@/src-client/components/NavBar";
import { getCompany } from "@/src-client/utilities/getCompany";
import { totalGenerate } from "@/src-client/utilities/totalGenerate";
import verifyUserCompany from "@/src-client/utilities/verifyCompany";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Company = () => {
  const dispatch: Function = useDispatch();
  const { data: session } = useSession();
  const [company, setCompany] = useState("loadingCompany");
  const companyData = useSelector((state: any) => state.CompanyReducer);
  const email = session?.user?.email;

  const verification = async () => {
    if (email) {
      const res = await verifyUserCompany(email);
      if (company !== res.msg) setCompany(res);
    }
  };
  if (companyData.name.length === 0 || company === "loadingCompany") {
    if (company === "loadingCompany") verification();
    if (company !== "loadingCompany" && company !== "Not found")
      getCompany(company, dispatch);
  }

  useEffect(() => {}, [company]);

  return (
    <div className="background-general">
      {company === "loadingCompany" && companyData.name !== "" && (
        <span className="loader"></span>
      )}
      {company === "Not found" && companyData.name === "" && (
        <>
          <h1>No hemos encontrado tu compañía</h1>
          <ModalRegister />
        </>
      )}
      {companyData.name !== "" && (
        <>
          <h1>{`Perteneces a ${companyData.name}`}</h1>
          <div>
            <Graphics
              type="negocio"
              incomes={companyData.incomes}
              expenses={companyData.expenses}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Company;
