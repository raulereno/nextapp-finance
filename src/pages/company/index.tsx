import { getNames } from "@/redux/slice/CompanySlice";
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
  const [companySelect, setCompanySelect] = useState("")
  const companyData = useSelector((state: any) => state.CompanyReducer.selectedCompany);
  const companyNames = useSelector((state: any) => state.CompanyReducer.names);
  const email = session?.user?.email;
  //verifico si el usuario esta asociado a companias y si es asi, las traigo
  const verification = async () => {
    if (email) {
      const res = await verifyUserCompany(email);
      if (company !== res) setCompany(res);
    }
  };
  //Si aun no tengo companias cargadas en el estado
  if (company === "loadingCompany" || companyNames.length === 0) {
    if (company === "loadingCompany") verification();
    if (company !== "loadingCompany" && company !== "Not found")
       dispatch(getNames(company));
  }

  const handleSelect = (id : string) => {
    if(id !== companySelect) {
      getCompany(id, dispatch)
      setCompanySelect(id)
    }
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
      {companyNames && (
        <>
          <h1>Seleccionar compañía</h1>
          <div>
            {/* <Graphics
              type="negocio"
              incomes={companyData.incomes}
              expenses={companyData.expenses}
            /> */}
            <ul>
              {companyNames.map((company : any)=> {
                return <li key={company.id}><button onClick={() => handleSelect(company.id)}>{company.name}</button></li>
              })}
            </ul>
            <ModalRegister />
          </div>
        </>
      )}
      {companySelect && companyData &&
      <> 
        <h2>{companyData.name}</h2>
        <Graphics
            type="negocio"
            incomes={companyData.incomes}
            expenses={companyData.expenses}
        />
       </>  
      }
    </div>
  );
};

export default Company;
