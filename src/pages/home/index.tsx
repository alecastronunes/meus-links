import { useEffect, useState } from "react";
import { Social } from "../../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { db } from "../../services/firebaseConnection"; // Faz coneão com o banco
import {
  getDocs,
  collection,
  orderBy,
  doc,
  getDoc,
  query,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  instagram: string;
  facebook: string;
  youtube: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef)
        .then((snapshot) => {
          const lista = [] as LinkProps[];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              name: doc.data().name,
              url: doc.data().url,
              bg: doc.data().bg,
              color: doc.data().color,
            });
          });

          setLinks(lista);
        })
        .catch((error) => {
          console.log("OCORREU UM ERRO: " + error);
        });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        // Aqui é utilizado o if pois o state inicia vazio, então ele pode ser undefined em algum momento.
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            instagram: snapshot.data()?.instagram,
            facebook: snapshot.data()?.facebook,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Alexandre Castro
      </h1>
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer delay-150 duration-300 ease-in-out"
          >
            <a href={link.url} target="_blank">
              <p style={{ color: link.color }} className="text-base md:text-lg">
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {/* Renderização condicional */}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#FFF" />
            </Social>
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color="#FFF" />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaYoutube size={35} color="#FFF" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
