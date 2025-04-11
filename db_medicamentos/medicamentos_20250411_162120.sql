--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-1.pgdg22.04+1)

-- Started on 2025-04-11 16:21:20 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 49153)
-- Name: medicamentos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.medicamentos (
    id_medicamento integer NOT NULL,
    nombre character varying(150),
    categoria character varying(50),
    tipo character varying(75),
    componente character varying(75),
    uso character varying(250)
);


--
-- TOC entry 216 (class 1259 OID 49158)
-- Name: medicamentos_id_medicamento_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.medicamentos_id_medicamento_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 216
-- Name: medicamentos_id_medicamento_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.medicamentos_id_medicamento_seq OWNED BY public.medicamentos.id_medicamento;


--
-- TOC entry 218 (class 1259 OID 65537)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100),
    password character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 217 (class 1259 OID 65536)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 3185 (class 2604 OID 49159)
-- Name: medicamentos id_medicamento; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicamentos ALTER COLUMN id_medicamento SET DEFAULT nextval('public.medicamentos_id_medicamento_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 65540)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 3335 (class 0 OID 49153)
-- Dependencies: 215
-- Data for Name: medicamentos; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.medicamentos VALUES (1, 'K-FER X 10', 'VITAMINAS', 'TABLETA', 'VITAMINA K', '');
INSERT INTO public.medicamentos VALUES (3, 'CELEDEXA X 10', 'ANTIHISTAMINICO', 'TABLETA', 'betametasona/dexclorfeniramina', 'rinitis asma dermatitis');
INSERT INTO public.medicamentos VALUES (4, 'ARTROSIL C/U ', 'VITAMINA', 'SOBRE', 'GLUCOSAMINA', '');
INSERT INTO public.medicamentos VALUES (5, 'ESO 10 MG C/U ', 'DIGESTIVO', 'SOBRE', 'ESOMEPRAZOL', '');
INSERT INTO public.medicamentos VALUES (6, 'FLORENTEROL C/U', 'DIGESTIVO', 'SOBRE', 'ENZIMAS DIGESTIVO', '');
INSERT INTO public.medicamentos VALUES (7, 'LACTEOL FORTE C/U', 'DIGESTIVO', 'SOBRE', 'ENZIMAS DIGESTIVO', '');
INSERT INTO public.medicamentos VALUES (8, 'LIVENPRO LATA 400 MG ', 'VITAMINA', 'SOBRE', 'ENSURE', '');
INSERT INTO public.medicamentos VALUES (9, 'MAGNES ACTIVE SOBRE', 'VITAMINA', 'SOBRE', 'MAGNESIO', '');
INSERT INTO public.medicamentos VALUES (10, 'MOVISIL C/U', 'VITAMINA', 'SOBRE', 'COLAGEN', '');
INSERT INTO public.medicamentos VALUES (11, 'PEGLAX C/U', 'DIGESTIVO', 'SOBRE', 'LAXANTE', '');
INSERT INTO public.medicamentos VALUES (12, 'POSITRAL C/ SOBRE', 'ANTIBIOTICO', 'SOBRE', 'FOSFOMICINA', 'IVU');
INSERT INTO public.medicamentos VALUES (13, 'PSYLLIUM PLANTAGOX 400', 'DIGESTIVO', 'SOBRE', 'FIBRA', '');
INSERT INTO public.medicamentos VALUES (14, 'WARMI C/FRASCO', 'VITAMINA', 'SOBRE', 'ENSURE', '');
INSERT INTO public.medicamentos VALUES (15, 'KETYUM C/U', 'ANALGESICO', 'AMPOLLA BEBIBLE', 'DEXKETOPROFENO', '');
INSERT INTO public.medicamentos VALUES (16, 'FOLACIN 5 BLISTER X 35 ', 'VITAMINA', 'TABLETA', 'ACIDO FOLICO', '');
INSERT INTO public.medicamentos VALUES (17, 'FUGADOL CAJA X 10 ', 'ANALGESICO', 'TABLETA', 'TRAMADOL', '');
INSERT INTO public.medicamentos VALUES (18, 'GABEX PLUS X 10', 'ANALGESICO', 'TABLETA', 'GABAPENTINA', '');
INSERT INTO public.medicamentos VALUES (19, 'GLICAZET CAJA X 30 ', 'HTA O DM', 'TABLETA', 'METFORMINA + GLIBENCLAMIDA', '');
INSERT INTO public.medicamentos VALUES (20, 'GLICAZET X 40', 'HTA O DM', 'TABLETA', 'METFORMINA + GLIBENCLAMIDA', '');
INSERT INTO public.medicamentos VALUES (21, 'HOMINUS CAJA X 30', 'OTROS', 'TABLETA', 'HPB', '');
INSERT INTO public.medicamentos VALUES (22, 'IBUPROFENO X 10', 'ANALGESICO', 'TABLETA', 'IBUPRUFENO', '');
INSERT INTO public.medicamentos VALUES (23, 'IBUWIN', 'ANALGESICO', 'TABLETA', 'IBUPRUFENO', '');
INSERT INTO public.medicamentos VALUES (24, 'K-FER X 10', 'VITAMINA', 'TABLETA', 'VITAMINA K', '');
INSERT INTO public.medicamentos VALUES (25, 'LAPRICEF X 10', 'ANTIBIOTICO', 'TABLETA', 'CEFADROXILO', '');
INSERT INTO public.medicamentos VALUES (26, 'LEVOGAM 500 MG ', 'ANTIBIOTICO', 'TABLETA', 'LEVOFLOXACINA', '');
INSERT INTO public.medicamentos VALUES (27, 'LEVOGAM 750 MG X 10 ', 'ANTIBIOTICO', 'TABLETA', 'LEVOFLOXACINA', '');
INSERT INTO public.medicamentos VALUES (28, 'LIPOZINOL X 30 40/10', 'HTA O DM', 'TABLETA', 'ATORBASTATINA', '');
INSERT INTO public.medicamentos VALUES (29, 'LISITRAN RELAX 10', 'ANALGESICO', 'TABLETA', 'TRAMADOL + ORFENADRINA', '');
INSERT INTO public.medicamentos VALUES (30, 'LOPERAKEM X 10', 'DIGESTIVO', 'TABLETA', 'LOPERAMIDA', '');
INSERT INTO public.medicamentos VALUES (31, 'MACROZIT', 'ANTIBIOTICO', 'TABLETA', 'AZITROMICINA', '');
INSERT INTO public.medicamentos VALUES (32, 'MELOFLEX RELAX CAJA X 10 ', 'ANALGESICO', 'TABLETA', 'MELOXICAN', '');
INSERT INTO public.medicamentos VALUES (33, 'MICCIL CAJA X 20', 'HTA O DM', 'TABLETA', 'ICC', 'ICC');
INSERT INTO public.medicamentos VALUES (34, 'MOTIDE 5 15 TABLETAS ', 'DIGESTIVO', 'TABLETA', 'SIMETICONA', '');
INSERT INTO public.medicamentos VALUES (35, 'PLAMODEX TAB CAJA X 14', 'ANTIBIOTICO', 'TABLETA', 'AMOXICILINA+SULVATAN', '');
INSERT INTO public.medicamentos VALUES (36, '﻿AZIL SPRAY', 'ANTIFUNGICO', 'SPRAY', 'terbinafina ', 'hongos uñas ');
INSERT INTO public.medicamentos VALUES (37, 'BECLORINO AQUA ', 'ANTIHISTAMINICO', 'SPRAY', 'beclometsona', 'rinitis alergica ');
INSERT INTO public.medicamentos VALUES (38, 'BENCIDEL (COLUTORIO) ', 'ANALGESICO', 'SPRAY', 'bencidamina ', 'irritacion boca ');
INSERT INTO public.medicamentos VALUES (39, 'BEPROSYNT SPRAY 50 MG ', 'ESTEROIDE', 'SPRAY', 'beclometsona', '');
INSERT INTO public.medicamentos VALUES (40, 'CORSY-DENT (EJUAGUE)', 'ANTISEPTICO ', 'SPRAY', 'ENJUAGUE ', 'GINGIVITIS-CARIES ');
INSERT INTO public.medicamentos VALUES (41, 'DICLORAL (ENJUAGUE) ', 'ANALGESICO', 'SPRAY', 'DICLOFENACO ', 'FAA-AFTAS-GINGI-EXTRACCIONES ');
INSERT INTO public.medicamentos VALUES (42, 'HISTAKEM SPRAY ', 'ANALGESICO', 'SPRAY', 'BENZOCAINA ', 'GINGIVITIS-CARIES ');
INSERT INTO public.medicamentos VALUES (43, 'NEOBOL SPRAY ', 'ANTIBIOTICO', 'SPRAY', 'NEOMICINA', 'ULCERA QUEMADURA ');
INSERT INTO public.medicamentos VALUES (44, 'RINOSIL SPRAY', 'ANTIHISTAMINICO', 'SPRAY', 'OXIMETAZOLINA', 'CONGESTION NASAL ');
INSERT INTO public.medicamentos VALUES (45, 'SACRUSYT SPRAY (SALBUT.)', 'ESTEROIDE', 'SPRAY', 'SALBUTAMOL ', '');
INSERT INTO public.medicamentos VALUES (46, 'SEPTIDEX SPRAY', 'ANTISEPTICO ', 'SPRAY', 'BACITRACINA+LIDO', 'HERIDAS RASPONES ');
INSERT INTO public.medicamentos VALUES (47, 'SOLSANA SPRAY', 'ANTIHISTAMINICO', 'SPRAY', 'SALUCION SALINA', 'CONGESTION NASAL ');
INSERT INTO public.medicamentos VALUES (48, 'TANTUM SPRAY', 'ANALGESICO', 'SPRAY', 'BUCAL ', 'irritacion boca ');
INSERT INTO public.medicamentos VALUES (49, 'VIDEFENAC SPRAY', 'ANALGESICO', 'SPRAY', 'TOPICO DICLO', 'MUSCULAR');
INSERT INTO public.medicamentos VALUES (50, 'ACICLOVIRAX GEL ', 'ANTIVIRAL', 'CREMA', 'ACICLOVIR', 'HERPES');
INSERT INTO public.medicamentos VALUES (51, 'ANDI VAGIL 3D ', 'ANTIFUNGICO', 'CREMA', 'CLINDA+CLOTRIMAZOL', 'VAGINITIS');
INSERT INTO public.medicamentos VALUES (52, 'ANDICAINA H-15 ', 'ESTEROIDE', 'CREMA', 'BEZOCAINA+HIDROCORTIZONA ', 'HEMORROIDES');
INSERT INTO public.medicamentos VALUES (53, 'HICET 60 ML ', 'ANTITUSIVO', 'JARABE', 'CETIRIZINA', '');
INSERT INTO public.medicamentos VALUES (54, 'LOMZOL 10 ML', 'DESPARACITANTE', 'JARABE', 'ALBENDAZOL', '');
INSERT INTO public.medicamentos VALUES (55, 'METRONIDAZOL 250 MG/5 ML', 'DESPARACITANTE', 'JARABE', 'METRONIDAZOL', '');
INSERT INTO public.medicamentos VALUES (56, 'NIZODIL 100 ML', 'ANTIBIOTICO', 'JARABE', 'CEFIXIMA', '');
INSERT INTO public.medicamentos VALUES (57, 'NOR CREZINC', 'VITAMINA', 'JARABE', 'ZINC', '');
INSERT INTO public.medicamentos VALUES (58, 'NOR TRIPAR 30 ML', 'DESPARACITANTE', 'JARABE', 'NITAXO', '');
INSERT INTO public.medicamentos VALUES (59, 'NOR TRIPAR 60 ML', 'DESPARACITANTE', 'JARABE', 'NITAXO', '');
INSERT INTO public.medicamentos VALUES (60, 'OXSOL 120 ML', 'ANTITUSIVO', 'JARABE', 'SALBUTAMOL+AMBROXOL', '');
INSERT INTO public.medicamentos VALUES (61, 'PLAMODEX 25 ML', 'ANTIBIOTICO', 'JARABE', 'AMOXICILINA+SULVATAN', '');
INSERT INTO public.medicamentos VALUES (62, 'POSTASIL 120 ML', 'VITAMINA', 'JARABE', 'COMPUESTAS', 'APETITO');
INSERT INTO public.medicamentos VALUES (63, 'PREDNICET 100 ML', 'ESTEROIDE', 'JARABE', 'PREDNIZOLONA', '');
INSERT INTO public.medicamentos VALUES (64, 'SELVIGON 100 ML ', 'ANTITUSIVO', 'JARABE', 'Loratadina', '');
INSERT INTO public.medicamentos VALUES (65, 'SINHISTAN CORT 60 ML', 'ANTIHISTAMINICO', 'JARABE', 'Loratadina', 'ALERGIA');
INSERT INTO public.medicamentos VALUES (66, 'TOXAZOL 100 ML', 'ANTIBIOTICO', 'JARABE', 'TRIPETOPRIN', '');
INSERT INTO public.medicamentos VALUES (67, 'ZEMICEF 50 ML', 'ANTIBIOTICO', 'JARABE', 'CEFIXIMA', '');
INSERT INTO public.medicamentos VALUES (68, 'ANDIGENT ANDIFAR ', 'ANTIBIOTICO', 'AMPOLLA', 'GENTAMICINA', '');
INSERT INTO public.medicamentos VALUES (69, 'DICLOSONA', 'ANALGESICO', 'AMPOLLA', 'DEXAMENTAZONA + DICLOFENACO', '');
INSERT INTO public.medicamentos VALUES (70, 'EUROCLIN 600 MG', 'ANTIBIOTICO', 'AMPOLLA', 'CLINDAMICINA', '');
INSERT INTO public.medicamentos VALUES (71, 'HISTAPRIN 10MG/ML ', 'ANTIHISTAMINICO', 'AMPOLLA', 'CLORFE', '');
INSERT INTO public.medicamentos VALUES (72, 'K-FER', 'VITAMINA', 'AMPOLLA', 'VITAMINA K', '');
INSERT INTO public.medicamentos VALUES (73, 'METIOM 40 MG I.V', 'DIGESTIVO', 'AMPOLLA', 'ESOMEPRAZOL', 'GASTRITIS');
INSERT INTO public.medicamentos VALUES (74, 'NEURALIN AMPOLLA ', 'ANALGESICO', 'AMPOLLA', 'LIDOCAINA+DEXA+COMPLEJO B', '');
INSERT INTO public.medicamentos VALUES (75, 'NOVOLIN N', 'HTA O DM', 'AMPOLLA', 'INSULINA', '');
INSERT INTO public.medicamentos VALUES (76, 'PRIMERIS I.V', 'ANTIBIOTICO', 'AMPOLLA', 'LEVOFLOXACINA', '');
INSERT INTO public.medicamentos VALUES (77, 'SUPRADOL DUET', 'ANALGESICO', 'AMPOLLA', 'AMPICILINA+SULBALTAN', '');
INSERT INTO public.medicamentos VALUES (78, 'TESTEX', 'OTROS', 'AMPOLLA', 'TESTOSTERONA', '');
INSERT INTO public.medicamentos VALUES (79, 'TONVAL I.V', 'DIGESTIVO', 'AMPOLLA', 'ESOMEPRAZOL', '');
INSERT INTO public.medicamentos VALUES (80, 'TRADOXIL', 'ANALGESICO', 'AMPOLLA', 'TRAMADOL + ORFENADRINA', '');


--
-- TOC entry 3338 (class 0 OID 65537)
-- Dependencies: 218
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios VALUES (1, 'admin', 'admin123', '2024-07-01 17:29:40.726725');
INSERT INTO public.usuarios VALUES (2, 'user', 'user123', '2024-07-01 17:29:40.726725');


--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 216
-- Name: medicamentos_id_medicamento_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.medicamentos_id_medicamento_seq', 97, true);


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 217
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);


--
-- TOC entry 3189 (class 2606 OID 49161)
-- Name: medicamentos medicamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.medicamentos
    ADD CONSTRAINT medicamentos_pkey PRIMARY KEY (id_medicamento);


--
-- TOC entry 3191 (class 2606 OID 65543)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


-- Completed on 2025-04-11 16:21:34 CST

--
-- PostgreSQL database dump complete
--

