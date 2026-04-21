"use client";

import { useState } from "react";
import { z } from "zod";

// Validasi Form Login menggunakan Zod
const loginSchema = z.object({
  email: z.string().email("Email Tidak Valid!"),
  password: z.string().min(6, "Password minimal 6 karakter!"),
});
