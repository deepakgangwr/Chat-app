import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  Pencil,
  Save,
  X,
  Crown,
  Calendar,
  ShieldCheck,
  UserCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullNameInput, setFullNameInput] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const fileInputRef = useRef(null);

  // Compress image to reduce file size
  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 500kB");
      return;
    }

    try {
      setIsProcessingImage(true);
      toast.loading("Processing image...");

      const compressedImage = await compressImage(file, 800, 0.8);
      const compressedSize = Math.ceil((compressedImage.length * 3) / 4);
      if (compressedSize > 2 * 1024 * 1024) {
        toast.error("Image too large even after compression.");
        return;
      }

      setSelectedImg(compressedImage);
      setHasUnsavedChanges(true);
      toast.dismiss();
      toast.success("Image ready!");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updateData = {};
      if (selectedImg) updateData.profilePic = selectedImg;
      if (fullNameInput.trim() && fullNameInput !== authUser?.fullName) {
        updateData.fullName = fullNameInput.trim();
      }

      if (Object.keys(updateData).length > 0) {
        await updateProfile(updateData);
        setSelectedImg(null);
        setHasUnsavedChanges(false);
        setIsEditingName(false);
        setFullNameInput("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancelChanges = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm("Discard unsaved changes?");
      if (!confirmed) return;
    }
    setSelectedImg(null);
    setFullNameInput("");
    setIsEditingName(false);
    setHasUnsavedChanges(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && hasUnsavedChanges) {
        handleCancelChanges();
      }
    };
    if (hasUnsavedChanges) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [hasUnsavedChanges]);

  return (
    <div className="relative h-screen pt-20 bg-gradient-to-b from-white via-sky-50 to-slate-50 overflow-hidden">
      {/* 🎨 Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-200 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute top-1/2 -left-20 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Profile Card */}
          <div className="col-span-1 rounded-3xl bg-gradient-to-br from-sky-100 via-sky-200 to-blue-100 text-slate-800 shadow-md p-6 text-center relative z-10">
            <div className="relative mx-auto w-32 h-32">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={openFileDialog}
                className={`absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow cursor-pointer transition hover:scale-105 ${
                  isUpdatingProfile || isProcessingImage
                    ? "animate-pulse opacity-70"
                    : ""
                }`}
                disabled={isUpdatingProfile || isProcessingImage}
                title="Change Profile Photo"
              >
                {isProcessingImage ? (
                  <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera className="w-5 h-5 text-sky-600" />
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>

            <div className="mt-4">
              <div className="text-xl font-semibold">{authUser?.fullName}</div>
              <div className="mt-1 inline-flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4" /> {authUser?.email}
              </div>
              <div className="mt-3 inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                <ShieldCheck className="w-4 h-4" /> Active Account
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            {hasUnsavedChanges && (
              <div className="mt-4 flex gap-2 justify-center">
                <button
                  onClick={handleSaveProfile}
                  disabled={isUpdatingProfile}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-white flex items-center gap-2 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdatingProfile ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelChanges}
                  disabled={isUpdatingProfile}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 flex items-center gap-2 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Cancel changes (Esc)"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="col-span-2 space-y-6 relative z-10">
            {/* Personal Info */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-200 to-sky-100 flex items-center justify-center text-sky-700">
                  <UserCircle className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Personal Information
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Full Name</div>
                  <input
                    className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4"
                    value={authUser?.fullName}
                    readOnly
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Email</div>
                  <input
                    className="w-full h-11 rounded-xl bg-slate-50 border border-slate-200 px-4"
                    value={authUser?.email}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-100 to-emerald-50 flex items-center justify-center text-green-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900">
                  Account Information
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-600">Member Since</span>
                  <span className="text-slate-900">
                    {authUser?.createdAt?.split("T")[0] || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-600">Account Status</span>
                  <span className="inline-flex items-center gap-2 text-green-600">
                    <span className="size-2 rounded-full bg-green-500"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Name Edit Section */}
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-semibold text-amber-900">
                  Edit Name
                </h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none"
                  placeholder={authUser?.fullName || "Your name"}
                  value={fullNameInput}
                  onChange={(e) => {
                    setFullNameInput(e.target.value);
                    setHasUnsavedChanges(true);
                  }}
                  disabled={!isEditingName || isUpdatingProfile}
                />
                {isEditingName ? (
                  <button
                    className="px-4 py-2 rounded-xl bg-amber-500 text-white flex items-center gap-2 hover:bg-amber-600"
                    disabled={
                      isUpdatingProfile || fullNameInput.trim().length === 0
                    }
                    onClick={() => {
                      if (!fullNameInput.trim()) return;
                      setHasUnsavedChanges(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="hidden sm:inline">Ready</span>
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 flex items-center gap-2 hover:bg-slate-300"
                    onClick={() => {
                      setFullNameInput(authUser?.fullName || "");
                      setIsEditingName(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
