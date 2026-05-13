-- Tabla candidaturas
CREATE TABLE public.job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  puesto TEXT,
  mensaje TEXT,
  cv_path TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede enviar (insert)
CREATE POLICY "Anyone can submit job application"
ON public.job_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Nadie puede leer desde cliente (solo service role / dashboard)
-- (sin policy SELECT = sin acceso)

-- Bucket privado para CVs
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', false)
ON CONFLICT (id) DO NOTHING;

-- Cualquier visitante puede subir su CV al bucket cvs
CREATE POLICY "Anyone can upload CV"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'cvs');
