import React from 'react';
import {Layout, Typography} from 'antd';
import {pure} from "recompose";

export default pure(() => (
    <Layout.Content style={{margin: '10px'}}>
        <Typography.Title level={4}>
            Colectarea și utilizarea informațiilor
        </Typography.Title>
        <Typography.Paragraph style={{textAlign: 'justify'}}>
            Dacă alegeți să utilizați Serviciul nostru, sunteți de acord cu
            colectarea și utilizarea informațiilor referitoare la această
            politică. Informațiile personale pe care le colectăm sunt utilizate
            pentru furnizarea și îmbunătățirea Serviciului. Nu vom folosi sau nu
            vă vom împărtăși informațiile cu nimeni, cu excepția celor descrise în
            această politică de confidențialitate.
        </Typography.Paragraph>

        <Typography.Title level={4}>Cookies</Typography.Title>
        <Typography.Paragraph style={{textAlign: 'justify'}}>
            Fișierele cookie sunt fișiere cu cantități mici de date care sunt
            utilizate în mod obișnuit un identificator unic anonim. Acestea sunt
            trimise în browserul dvs. de pe site-ul pe care îl vizitați și sunt
            stocate în memoria internă a dispozitivului. Aveți opțiunea de a
            accepta sau de a refuza aceste cookie-uri și de a ști când se trimite
            un cookie pe dispozitiv. Dacă alegeți să refuzați cookie-urile
            noastre, este posibil să nu puteți utiliza anumite porțiuni ale
            acestui serviciu.
        </Typography.Paragraph>

        <Typography.Title level={4}>
            Legături către alte site-uri
        </Typography.Title>
        <Typography.Paragraph style={{textAlign: 'justify'}}>
            Acest serviciu poate conține linkuri către alte site-uri. Dacă faceți
            clic pe un link de la o terță parte, veți fi direcționat către acel
            site. Rețineți că aceste site-uri externe nu sunt operate de noi. Prin
            urmare, vă sfătuim cu tărie să revizuiți Politica de confidențialitate
            a acestor site-uri web. Nu avem control și nu ne asumăm nicio
            responsabilitate pentru conținutul, politicile de confidențialitate
            sau practicile site-urilor sau serviciilor terților.
        </Typography.Paragraph>

        <Typography.Title level={4}>
            Confidențialitatea datelor despre copii
        </Typography.Title>
        <Typography.Paragraph style={{textAlign: 'justify'}}>
            Aceste Servicii nu se adresează persoanelor sub vârsta de 16 ani. Nu
            colectăm cu bună știință informații cu privire la identificarea
            personală de la copii cu vârsta sub 16 ani. În cazul în care
            descoperim că un copil sub 16 ani ne-a furnizat informații personale,
            ștergem imediat acest lucru de pe serverele noastre.
        </Typography.Paragraph>

        <Typography.Title level={4}>
            Modificări la această politică de confidențialitate
        </Typography.Title>
        <Typography.Paragraph style={{textAlign: 'justify'}}>
            Putem actualiza Politica de confidențialitate periodic. Prin urmare,
            vi se recomandă să examinați periodic această pagină pentru orice
            modificare. Vă vom notifica despre orice modificare prin publicarea
            noii Politici de confidențialitate pe această pagină. Aceste
            modificări sunt valabile imediat după ce sunt postate pe această
            pagină.
        </Typography.Paragraph>

        <Typography.Title level={4}>Contactează-ne</Typography.Title>
        <Typography.Paragraph style={{textAlign: 'justify'}}>
            Dacă aveți întrebări sau sugestii despre Politica de confidențialitate
            cât și despre modificarea sau ștergerea datelor personale, nu ezitați
            să ne contactați la minijobsromania@gmail.com
        </Typography.Paragraph>
    </Layout.Content>
));
