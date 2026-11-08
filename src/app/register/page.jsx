"use client";

import RegisterImage from "@/assets/login.jpg";
import {
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "StudyNook - Register";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const user = Object.fromEntries(formdata.entries());

    // Password validation: at least 6 chars, 1 uppercase, 1 lowercase
    if (!user.password || user.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(user.password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(user.password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.imgUrl,
        callbackURL: "/signin",
      });

      if (data) {
        toast.success("Registration successful! Please sign in.");
        router.push("/signin");
      }
      if (error) {
        toast.error(error.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      toast.success("Redirecting to Google sign in...");
    } catch (err) {
      toast.error("Google sign up failed");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 pt-18 sm:pt-20 ">
      <div className="flex flex-col lg:flex-row items-stretch border border-border rounded-2xl shadow-xl overflow-hidden bg-card">
        {/* Left Side Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="w-full space-y-6">
            {/* Header */}
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                Create an Account
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Join StudyNook to access exclusive study spaces and features
              </p>
            </div>

            {/* Social Login */}
            <button
              onClick={handleGoogle}
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border bg-background hover:bg-secondary text-xs sm:text-sm font-semibold text-foreground transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <FcGoogle className="text-xl" />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="relative my-6 text-center">
            <hr className="border-border" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
              OR
            </span>
          </div>

          <Form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            render={(props) => <form {...props} />}
          >
            <TextField isRequired name="name" type="text">
              <Label className="text-xs sm:text-sm font-medium text-foreground">
                Name
              </Label>
              <Input
                className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Jane Doe"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-xs sm:text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="jane@university.edu"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField isRequired name="imgUrl" type="url">
              <Label className="text-xs sm:text-sm font-medium text-foreground">
                Profile Image URL
              </Label>
              <Input
                className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              minLength={6}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }
                return null;
              }}
            >
              <Label className="text-xs sm:text-sm font-medium text-foreground">
                Password
              </Label>
              <Input
                className="w-full rounded-xl border border-border bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter a secure password"
              />
              <Description className="text-xs text-muted-foreground mt-1">
                At least 6 characters with 1 uppercase & 1 lowercase letter
              </Description>
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-md hover:bg-primary/90 transition-all active:scale-[0.99] cursor-pointer mt-2"
            >
              <span>{loading ? "Registering..." : "Register"}</span>
            </button>

            <p className="text-center text-xs text-muted-foreground pt-3">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-bold text-primary hover:underline underline-offset-2"
              >
                Login here
              </Link>
            </p>
          </Form>
        </div>

        {/* Right Side Branding */}
        <div className="relative hidden lg:flex lg:w-1/2 bg-primary">
          <Image
            src={RegisterImage}
            alt="Sign Up"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-30"
          />
          <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between h-full text-white">
            <div className="space-y-4 my-auto">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight drop-shadow-xs">
                Find Your Ideal Study Haven
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Reserve quiet study spaces, private rooms, and collaborative
                hubs with instant booking and seamless access.
              </p>
              <ul className="space-y-3 pt-4">
                <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                  <FaCheckCircle className="text-[#B07D3C] shrink-0" />
                  <span>Verified high-speed Wi-Fi & quiet zones</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                  <FaCheckCircle className="text-[#B07D3C] shrink-0" />
                  <span>Zero double-booking guarantee</span>
                </li>
                <li className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                  <FaCheckCircle className="text-[#B07D3C] shrink-0" />
                  <span>List your own room & earn seamlessly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
