// import Header from '@components/header';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { useAuth, useRestActor } from "@bundly/ares-react";
import { useHappenContext } from "@/context/HappenContext";
import { LoginButton, LogoutButton } from "@/components/AuthButton";

export default function IcConnectPage(): JSX.Element {
  const { backend } = useHappenContext();
  const { isAuthenticated, identity } = useAuth();

  async function health() {
    try {
      const health = await backend.get("/health");
      console.log("health", health);
    } catch (error) {
      console.error({ error });
    }
  }

  async function me() {
    try {
      const me = await backend.get("/user/me");
      console.log("me: ", me);
    } catch (error) {
      console.error({ error });
    }
  }

  async function registeradmin() {
    try {
      const registeradmin = await backend.post(
        "/user/register",
        {
          name: "admin",
          email: "hello@dvcode.tech",
          mobile_number: "09123456789",
          birth_date: "1999-01-07",
          region: "Region III (Central Luzon)",
          province: "Pampanga",
          city: "Angeles City",
          address:
            '{"address":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy, Pulungbulu, Angeles City, Pampanga, Region III (Central Luzon)","details":{"region_code":"03","province_code":"0354","city_code":"035401","brgy_code":"035401020","street":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy","postalCode":"2009"}}',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("registeradmin:", registeradmin);
    } catch (error) {
      console.error({ error });
    }
  }

  async function initadmin() {
    try {
      const initadmin = await backend.post("/init");
      console.log("initadmin:", initadmin);
    } catch (error) {
      console.error({ error });
    }
  }

  async function registeruser() {
    try {
      const registeruser = await backend.post(
        "/user/register",
        {
          name: "Belo Test",
          email: "bt@gmail.com",
          mobile_number: "09123456222",
          birth_date: "1989-08-09",
          region: "Region III (Central Luzon)",
          province: "Pampanga",
          city: "Angeles City",
          address:
            '{"address":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy, Pulungbulu, Angeles City, Pampanga, Region III (Central Luzon)","details":{"region_code":"03","province_code":"0354","city_code":"035401","brgy_code":"035401020","street":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy","postalCode":"2009"}}',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("registeruser:", registeruser);
    } catch (error) {
      console.error({ error });
    }
  }

  async function registeruser1() {
    try {
      const registeruser = await backend.post(
        "/user/register",
        {
          name: "Bernadeth Salabugang",
          email: "bs@gmail.com",
          mobile_number: "09123456111",
          birth_date: "1999-08-01",
          region: "Region III (Central Luzon)",
          province: "Pampanga",
          city: "Angeles City",
          address:
            '{"address":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy, Pulungbulu, Angeles City, Pampanga, Region III (Central Luzon)","details":{"region_code":"03","province_code":"0354","city_code":"035401","brgy_code":"035401020","street":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy","postalCode":"2009"}}',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("registeruser:", registeruser);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updateuser1() {
    try {
      const updateuser = await backend.post(
        "/user/update",
        {
          name: "Bernadeth Salabugang Edited",
          mobile_number: "09123456111",
          birth_date: "1999-08-01",
          region: "Region III (Central Luzon)",
          province: "Pampanga",
          city: "Angeles City",
          address:
            '{"address":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy, Pulungbulu, Angeles City, Pampanga, Region III (Central Luzon)","details":{"region_code":"03","province_code":"0354","city_code":"035401","brgy_code":"035401020","street":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy","postalCode":"2009"}}',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updateuser:", updateuser);
    } catch (error) {
      console.error({ error });
    }
  }

  async function getuserinfobyuid() {
    try {
      const getuserinfobyuid = await backend.get("/user/2/info");
      console.log("getuserinfobyuid:", getuserinfobyuid);
    } catch (error) {
      console.error({ error });
    }
  }

  async function createlocation() {
    try {
      const createlocation = await backend.post(
        "/admin/location/create",
        {
          name: "Belo Medical Center",
          location_type: 1,
          mobile_number: "09123456222",
          region: "Region III (Central Luzon)",
          province: "Pampanga",
          city: "Angeles City",
          address:
            '{"address":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy, Pulungbulu, Angeles City, Pampanga, Region III (Central Luzon)","details":{"region_code":"03","province_code":"0354","city_code":"035401","brgy_code":"035401020","street":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy","postalCode":"2009"}}',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("createlocation:", createlocation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updatelocation() {
    try {
      const updatelocation = await backend.post(
        "/admin/location/update/1",
        {
          name: "Belo Medical Center Edited",
          status: 1,
          location_type: 1,
          mobile_number: "09123456222",
          region: "Region III (Central Luzon)",
          province: "Pampanga",
          city: "Angeles City",
          address:
            '{"address":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy, Pulungbulu, Angeles City, Pampanga, Region III (Central Luzon)","details":{"region_code":"03","province_code":"0354","city_code":"035401","brgy_code":"035401020","street":"GF TL Plaza Commercial building,B1 Unit 3/7,191 McArthur Hwy","postalCode":"2009"}}',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updatelocation:", updatelocation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewalllocation() {
    try {
      const viewalllocation = await backend.get("/admin/location/viewall");
      console.log("viewalllocation:", viewalllocation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function createpersonnel() {
    try {
      const createpersonnel = await backend.post(
        "/admin/personnel/create",
        {
          userId: 3,
          locationId: 1,
          bio: "Doctor test",
          personnel_type: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("createpersonnel:", createpersonnel);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updatepersonnel() {
    try {
      const updatepersonnel = await backend.post(
        "/admin/personnel/update/1",
        {
          locationId: 1,
          bio: "Doctor test Edited",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updatepersonnel:", updatepersonnel);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewallpersonnel() {
    try {
      const viewallpersonnel = await backend.get("/admin/personnel/viewall");
      console.log("viewallpersonnel:", viewallpersonnel);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewpersonnelbyid() {
    try {
      const viewpersonnelbyid = await backend.get("/personnel/view/1");
      console.log("viewpersonnelbyid:", viewpersonnelbyid);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewallpersonnelpublic() {
    try {
      const viewallpersonnelpublic = await backend.get("/personnel/viewall");
      console.log("viewallpersonnelpublic:", viewallpersonnelpublic);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewallpersonnelpublicbylocation() {
    try {
      const viewallpersonnelpublicbylocation = await backend.get(
        "/personnel/location/1/viewall",
      );
      console.log(
        "viewallpersonnelpublicbylocation:",
        viewallpersonnelpublicbylocation,
      );
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewlocationbyid() {
    try {
      const viewlocationbyid = await backend.get("/location/view/1");
      console.log("viewlocationbyid:", viewlocationbyid);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewalllocationpublic() {
    try {
      const viewalllocationpublic = await backend.get("/location/viewall");
      console.log("viewalllocationpublic:", viewalllocationpublic);
    } catch (error) {
      console.error({ error });
    }
  }

  async function createjourney() {
    try {
      const createjourney = await backend.post(
        "/journey/create",
        {
          image: "https://i.imgur.com/PxVCmFc.jpeg",
          content: "Sample content",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("createjourney:", createjourney);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updatejourney() {
    try {
      const updatejourney = await backend.post(
        "/journey/update/1",
        {
          image: "https://i.imgur.com/PxVCmFc.jpeg",
          content: "Sample content Edited",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updatejourney:", updatejourney);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewjourneybyid() {
    try {
      const viewjourneybyid = await backend.get("/journey/view/1");
      console.log("viewjourneybyid:", viewjourneybyid);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewjourneybyuser() {
    try {
      const viewjourneybyuser = await backend.get("/journey/user/2/viewall");
      console.log("viewjourneybyuser:", viewjourneybyuser);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewjourneyfeed() {
    try {
      const viewjourneyfeed = await backend.get("/journey/feed", {
        params: {
          page: "1",
          pageSize: "5",
        },
      });
      console.log("viewjourneyfeed:", viewjourneyfeed);
    } catch (error) {
      console.error({ error });
    }
  }

  async function createjourneycomment() {
    try {
      const createjourneycomment = await backend.post(
        "/journeycomment/create",
        {
          image: "https://i.imgur.com/PxVCmFc.jpeg",
          content: "Sample comment content",
          journeyId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("createjourneycomment:", createjourneycomment);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updatejourneycomment() {
    try {
      const updatejourneycomment = await backend.post(
        "/journeycomment/update/1",
        {
          image: "https://i.imgur.com/PxVCmFc.jpeg",
          content: "Sample comment content Edited",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updatejourneycomment:", updatejourneycomment);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewjourneycommentbyjourney() {
    try {
      const viewjourneycommentbyjourney = await backend.get(
        "/journeycomment/journey/1/viewall",
      );
      console.log("viewjourneycommentbyjourney:", viewjourneycommentbyjourney);
    } catch (error) {
      console.error({ error });
    }
  }

  async function scanqr() {
    try {
      const scanqr = await backend.post(
        "/personnel/scan",
        {
          principal_id:
            "or7na-llhdh-5koxz-osiro-t7uk6-4vsdw-lpxet-ftyim-ihuon-pt4pf-vae",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("scanqr:", scanqr);
    } catch (error) {
      console.error({ error });
    }
  }

  async function createconsultation() {
    try {
      const createconsultation = await backend.post(
        "/personnel/consultation/create",
        {
          content: "Sample consultation",
          userId: 2,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("createconsultation:", createconsultation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updateconsultation() {
    try {
      const updateconsultation = await backend.post(
        "/personnel/consultation/update/1",
        {
          content: "Sample consultation Edited",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updateconsultation:", updateconsultation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewconsultationbyid() {
    try {
      const viewconsultationbyid = await backend.get(
        "/personnel/consultation/view/1",
      );
      console.log("viewconsultationbyid:", viewconsultationbyid);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewconsultationbyuser() {
    try {
      const viewconsultationbyuser = await backend.get(
        "/consultation/user/2/viewall",
      );
      console.log("viewconsultationbyuser:", viewconsultationbyuser);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewallmyconsultation() {
    try {
      const viewallmyconsultation = await backend.get(
        "/personnel/consultation/viewall",
      );
      console.log("viewallmyconsultation:", viewallmyconsultation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function createconsultationcomment() {
    try {
      const createconsultationcomment = await backend.post(
        "/consultationcomment/create",
        {
          content: "Sample comment content",
          consultationId: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("createconsultationcomment:", createconsultationcomment);
    } catch (error) {
      console.error({ error });
    }
  }

  async function updateconsultationcomment() {
    try {
      const updateconsultationcomment = await backend.post(
        "/consultationcomment/update/1",
        {
          content: "Sample comment content Edited",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("updateconsultationcomment:", updateconsultationcomment);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewconsultationcommentbyconsultation() {
    try {
      const viewconsultationcommentbyconsultation = await backend.get(
        "/consultationcomment/consultation/1/viewall",
      );
      console.log(
        "viewconsultationcommentbyconsultation:",
        viewconsultationcommentbyconsultation,
      );
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewallconsultation() {
    try {
      const viewallconsultation = await backend.get("/consultation/viewall");
      console.log("viewallconsultation:", viewallconsultation);
    } catch (error) {
      console.error({ error });
    }
  }

  async function viewconsultationuserbyid() {
    try {
      const viewconsultationuserbyid = await backend.get(
        "/consultation/view/1",
      );
      console.log("viewconsultationuserbyid:", viewconsultationuserbyid);
    } catch (error) {
      console.error({ error });
    }
  }

  async function searchlocation() {
    try {
      const searchlocation = await backend.get("/location/search", {
        params: { city: "Angeles City", location_type: "1" },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("searchlocation:", searchlocation);
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <div>
      <div className="flex gap-4">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
      <div className="grid min-h-screen grid-cols-3">
        <div className="bg-red-500/10">
          <p className="text-2xl">ADMIN</p>
          <div className="flex flex-col items-start gap-2">
            <button onClick={me}>Me</button>
            <button onClick={registeradmin}>Register Admin</button>
            <button onClick={initadmin}>Init Admin</button>
            <button onClick={createlocation}>Create Location</button>
            <button onClick={updatelocation}>Update Location</button>
            <button onClick={viewalllocation}>View All Location</button>
            <button onClick={createpersonnel}>Create Personnel</button>
            <button onClick={updatepersonnel}>Update Personnel</button>
            <button onClick={viewallpersonnel}>View All Personnel</button>
          </div>
        </div>
        <div className="bg-blue-500/10">
          <p className="text-2xl">PERSONNEL</p>
          <div className="flex flex-col items-start gap-2">
            <button onClick={me}>Me</button>
            <button onClick={registeruser}>Register User</button>
            <button onClick={scanqr}>Scan QR</button>
            <button onClick={createconsultation}>Create Consultation</button>
            <button onClick={updateconsultation}>Update Consultation</button>
            <button onClick={viewconsultationbyid}>
              View Consultation by Id
            </button>
            <button onClick={viewconsultationbyuser}>
              View All Consultation by User
            </button>
            <button onClick={viewallmyconsultation}>
              View All My Consultations
            </button>
            <button onClick={createconsultationcomment}>
              Create Consultation Comment
            </button>
            <button onClick={updateconsultationcomment}>
              Update Consultation Comment
            </button>
            <button onClick={viewconsultationcommentbyconsultation}>
              View All Consultation Comments by Consultation
            </button>
          </div>
        </div>
        <div className="bg-green-500/10">
          <p className="text-2xl">USER</p>
          <div className="flex flex-col items-start gap-2">
            <button onClick={me}>Me</button>
            <button onClick={registeruser1}>Register 1 User</button>
            <button onClick={updateuser1}>Update 1 User</button>
            <button onClick={getuserinfobyuid}>Get User Info by uid</button>
            <button onClick={viewpersonnelbyid}>View Personnel by Id</button>
            <button onClick={viewallpersonnelpublic}>View All Personnel</button>
            <button onClick={viewallpersonnelpublicbylocation}>
              View All Personnel by Location
            </button>
            <button onClick={viewlocationbyid}>View Location by Id</button>
            <button onClick={viewalllocationpublic}>View All Location</button>
            <button onClick={searchlocation}>Search Location</button>
            <button onClick={createjourney}>Create Journey</button>
            <button onClick={updatejourney}>Update Journey</button>
            <button onClick={viewjourneybyid}>View Journey by Id</button>
            <button onClick={viewjourneybyuser}>
              View All Journey by User
            </button>
            <button onClick={viewjourneyfeed}>View Journey Feed</button>

            <button onClick={createjourneycomment}>
              Create Journey Comment
            </button>
            <button onClick={updatejourneycomment}>
              Update Journey Comment
            </button>
            <button onClick={viewjourneycommentbyjourney}>
              View All Journey Comments by Journey
            </button>
            <button onClick={viewallconsultation}>
              View All Consultations
            </button>
            <button onClick={viewconsultationuserbyid}>
              View Consultation by Id
            </button>
            <button onClick={createconsultationcomment}>
              Create Consultation Comment
            </button>
            <button onClick={updateconsultationcomment}>
              Update Consultation Comment
            </button>
            <button onClick={viewconsultationcommentbyconsultation}>
              View All Consultation Comments by Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
