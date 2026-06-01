"use client";

import React, { useState, useEffect, useRef } from "react";
import logoImage from "../src/assets/images/segunda_division_logo_1779698107611.png";
import {
  Star,
  Shirt,
  Sparkles,
  Wallpaper,
  Heart,
  MessageSquare,
  User,
  Plus,
  Upload,
  Search,
  ArrowLeft,
  Share2,
  X,
  Send,
  Shield,
  Moon,
  Sun,
  Camera,
  CheckCircle,
  LogOut,
  Sparkle,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  subcategory?: string;
  status: string; // e.g. "Como nuevo", "Usado - Excelente", "Colección", "Nuevo con etiquetas", etc.
  seller: string;
  sellerPhoto?: string;
  sellerRating?: number;
  sellerReviewsCount?: number;
  location: string;
  image: string;
  secondaryImage?: string;
  description: string;
  featured?: boolean;
}

interface Message {
  sender: "user" | "seller";
  text: string;
  time: string;
}

interface ChatSession {
  productId: string;
  productTitle: string;
  sellerName: string;
  messages: Message[];
}

export default function Home() {
  // Theme state (Dark Mode)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{
    name: string;
    photo: string;
    favorites: string[]; // product IDs
    myAds: Product[];
  }>({
    name: "Carlos García",
    photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCoagQHO2BtzXc_LRoxtTyhiPo_k_4-uBgl_i4rIKvcQufb1Azpmed-z43oaYZpqO0WqootoqFK8ZI2TjMSE1Un8gf9ccwh5wgMeghwZTjP0O5sRAnRF0UKkHwylzVs5vTNjmnhWJnIZ4FsLz3zJiH2pcuxe7hZOttQxUr9Z4aG_z1koK93y0av8W4D4YiSISMNOKIPfNgtzKbnjSQaEmjUEvhMFVS0b_Pi0eiNH-Ma5Nuj0xKB2SCgKUGhTsUQClphAkcyOBxd9-E",
    favorites: ["3", "4"],
    myAds: [
      {
        id: "6",
        title: "Camiseta Real Oviedo 1994",
        price: 45,
        category: "Equipaciones",
        subcategory: "Camisetas",
        status: "Como nuevo",
        seller: "Carlos García",
        location: "Oviedo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZXfp8ZV7ku9Ul8xIiNJCWGbSxFYw3MN6RrKZsWhzE9r6GIxsXmY1KMM81b1yOi_hABVKDu6Qzl3TEUfUobxkNKJPmvjgYLtWceGfGCzSrX_Pq_W1fh7isBLlu-SbDjIgkwF--n21Jsf2bzPnehg1EPUjfHCvD3mIZmrQ7zind1v4W200k2UWSU1n91w-JQg7XEaxW01vN1eO2lSNrHo0rDTHnRthWnuB0WEZphcmK4we63Se-LL8zrx0oCBsT8w-J-UHmv4h0uXTp",
        description: "Preciosa réplica histórica del Oviedo de 1994, marca Joluvi. Prácticamente sin usar, ideal para coleccionistas o nostálgicos del club asturiano.",
        featured: false
      },
      {
        id: "7",
        title: "Botas Predator Pro",
        price: 89,
        category: "Botas",
        status: "Nuevo",
        seller: "Carlos García",
        location: "Oviedo",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcyK-coK-9w5G8duvsaTRqk1Ob9NL9FxLSKA60snuVUL4IFgZKAMHjTPXIVRvC39TQO9YXBa9e3WzUfIGQaGQV0tGE2Lyi_aDTFDVAjQRKeKqOageZ1cfffKXhjXgGEeWCbxJavObI1UHsl5TdCthj5mfIaUhh1i7QoCa72fJMxrGxr1A1ZfeUG0hxMlSuUSRdub5jJZ30qlPSR0LnhvYn1i1MpjTo6Rld8w5EyLyHrGt11uM0mSLyPBaqcPq1ZAa9TaMAW9AFYb5c",
        description: "Botas de fútbol profesionales, sin estrenar. Se venden porque me quedan pequeñas.",
        featured: false
      }
    ]
  });

  // Guest actions state (To migrate during login)
  const [guestFavorites, setGuestFavorites] = useState<string[]>([]);
  const [guestAds, setGuestAds] = useState<Product[]>([]);

  // Marketplace Products
  const initialProducts: Product[] = [
    {
      id: "1",
      title: "Camiseta Real Madrid 2004",
      price: 45,
      category: "Equipaciones",
      subcategory: "Camisetas",
      status: "Como nuevo",
      seller: "Pepe F.",
      sellerRating: 4.8,
      sellerReviewsCount: 12,
      location: "Madrid",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYSKLXD4uwmmlcVv-kUYxh8nzLvcZPdb1YvbydFBrB6Flu2zPyQfHUvtMtbxf6zgZr0lld40C5fEz52gSIoOSwFKf3pqmSoAdJB6y-tjHXtQQAH9yBo4fBWZHnbuKwjO9BDaa6bOonXK0It6GMEqAxcj__niRASfjBzGp1tVqfaVAhRpNFnwEoiw7Z5eRs_MYB_VtT9cQV9PCQ69ORqfemMa9qU-sZQyCG7ii9sCU-jd9FMD06vNN9X1w3FysvTra4AZho7szhPs4J",
      description: "Espectacular camiseta retro del Real Madrid de los galácticos con dorsal Zidane. En perfecto estado, guardada libre de polvo.",
      featured: true
    },
    {
      id: "2",
      title: "Botas Nike Mercurial Vapor",
      price: 35,
      category: "Botas",
      status: "Usado",
      seller: "Juan M.",
      sellerRating: 4.9,
      sellerReviewsCount: 24,
      location: "Sevilla",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-nfqvF-33RNGzVG_EaQeYW9q3WPaSwuYrdewk2vGBsQLI5paS0cplTa0gPdXbCxlI9oX58MNZR4Nwynas9z0I6FCSfv4LnpVm6HHzt6LpWyyfqsJncLXvTe7uB-H5cKvEiRQKNd1bQGRtYMqHkFshRf6rSZRZUzkqGCE-ftSrJs2NTuKE2G6x5jzBDO9U-HUDaSjwABdQYVifBTuCGU3UlDpvua9K67SxO62RIrlcDInD4CShhU2nq-LlnqZIOgyM_yMEdZF5G1SG",
      description: "Botas ligeras de velocidad, tacos de goma para césped artificial. Tienen marcas de uso pero las costuras y la suela están perfectas.",
      featured: true
    },
    {
      id: "3",
      title: "Balón de cuero clásico años 70",
      price: 120,
      category: "Coleccionista",
      status: "Colección",
      seller: "RetroKick",
      sellerRating: 4.6,
      sellerReviewsCount: 8,
      location: "Barcelona",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxNAg6krxNhMSW_Ib-FQyXx9hbdimSA_XVt652o9nrPYlEvaAcVmrpuDEK-7ecitEPvKbtU7nRbIBZtW2MfujJ5X0NEViWS7fW0FkrL91RIkGIBw-HF_bLXEXeMMCc1OOwAbrxby-E69V8IYD8H3JxScST1AFl95TJRpoMfvJeJWJoDia6KgLX2LMhTWe2EZMa8OJPN2Kq8SPIz48DYe_uLD2HGMfNqZlhbQivDHKv75WC4TLPUrX-kE1gQOrZOTE5uq9tRNK4NMsG",
      description: "Balón decorativo retro de cuero auténtico con cordones, ideal para vestir tu despacho o salón futbolero. Mantiene la cámara de aire funcional.",
      featured: true
    },
    {
      id: "4",
      title: "Guantes Portero Reusch",
      price: 25,
      category: "Decoración",
      status: "Nuevo",
      seller: "Gorka P.",
      sellerRating: 5.0,
      sellerReviewsCount: 5,
      location: "Bilbao",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqMBuMbeSkAHqPlkUXqu4EDUuTbyNS0Da5ysSxapS5KPp3L7OSjlc5cDj8YgtFcyMDkusmmZpDG17LQSv1xCvFbbOqxNVPmUrkDzMDVB3OZhAQBHobf2G3L1vNEneTqdp5FUAfpu7ydwvjSlBped2_Sro46RTwIGQefJdHuRlMg6GoHfyfrCWFADdwahNhcYzLAsQs9tDeo7Lb6Y4toWBFzoDerm62Ff5ai8eshJUgUMBEAv718ta-QOsKVRBTPvyVxskN27t5UO4w",
      description: "Guantes de portero con látex de alto agarre, corte híbrido y protección antipresión en la zona de dedos. Nuevos a estrenar.",
      featured: false
    },
    {
      id: "5",
      title: "Bota Adidas Predator Clásica",
      price: 120,
      category: "Botas",
      status: "Usado - Excelente",
      seller: "Juan M.",
      sellerPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuDanOnuEs-vIfCubc0-WV6sK2PnftPPEdXfTz_PZ-F6KFNFa51KMqtuaW6n4At7BiFaXUMEgk5K9Bbv1r2V7aey-zjGNpxur3bA2eYV8EZTktOW1v4J_VTw-gJ7vCkoSWKRy8qLTbtk-Q0z8tzqjILWMvqhsw6XYL7aorl17CMuamPFItT5SICo7JNKRfNtUTvT8iwS0VuvWJyNpXNtRfPm6bGpBRwpG7tEnxuEtsfJTbYnc1rLtKGTmrROEThGiNHtoYp2_jVgGsx7",
      sellerRating: 4.9,
      sellerReviewsCount: 24,
      location: "Madrid",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP7_v4LyctSokkDUYLsJ9etsupqE1fA-j-0ZOAylwiZw2xZnNO_H4887ty7Z5ZhzN-0nkWdlbLUuDbvtS1j31FuFLFpNxRI6nJ3oDrw_vcFGXTjEssibnp3DnIkmdnnCeY3yRufRoEAEzFimmXgIu4WN_UQzrm_EsOQzKYHeLbwYjGSuQ2ZvUTfIN_DA7CoyVeYw_CEPS7MAcgUrQaeoqvQ_7qIJdkMalyrdsljTcSKwYAMNGUUKxddUgHtXQOEoYcbZogjLfFWrkE",
      secondaryImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFgWT_gqfeApurr9zZNKulB291qVMLKf3dAOldOmEW_HU_-qcQ6fqFla2j90ajexEvtECAYx6dQer7QCIW1UC9UjwXQuaEuwjb2og5mIERklx8mqT4fdknMZIu2_jmnJ0pmCY-4gQI8M-4SWJNdRYMAwjxoaCUil7nNsVxAfFamFSd2LUsqlA6H2XNTQQdOmGxZlSsM0FzUQ94Tjy-GqmMpTsPBjiAjKoz0iqHBwxAmXkYog02ZwdLj0Fo4PtQo92-1wRc5cNn2fPv",
      description: "Icónica Adidas Predator de la época dorada. Piel de canguro de máxima calidad, lengüeta clásica y el mítico diseño en negro y rojo. Talla 42. Utilizadas solo en un par de ocasiones, mantienen el agarre original.",
      featured: true
    }
  ];

  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Filter Categories View state
  const [selectedCategory, setSelectedCategory] = useState<string>("Destacados");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Active Selected Product Details View
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailPhotoIndex, setDetailPhotoIndex] = useState<number>(0);

  // Modals & Navigation Views
  const [isSellingModalOpen, setIsSellingModalOpen] = useState<boolean>(false);
  const [activeProfileTab, setActiveProfileTab] = useState<"listings" | "favorites" | "messages">("listings");
  const [isProfileViewOpen, setIsProfileViewOpen] = useState<boolean>(false);

  // Interactive Live Chat
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatIndex, setActiveChatIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  // Step-by-Step Sale Wizard Form
  const [formStep, setFormStep] = useState<number>(1);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("Equipaciones");
  const [newStatus, setNewStatus] = useState<string>("Nuevo con etiquetas");
  const [newPrice, setNewPrice] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGeneratingAiDesc, setIsGeneratingAiDesc] = useState<boolean>(false);

  // Special animation triggers
  const [showGoalOverlay, setShowGoalOverlay] = useState<boolean>(false);
  const [penaltyCard, setPenaltyCard] = useState<{ color: "yellow" | "red"; reason: string } | null>(null);

  // Track system initialization to prevent early state-savers overwriting saved items
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load data from localStorage on mount (runs exactly once after hydration)
  useEffect(() => {
    setTimeout(() => {
      try {
        const savedIsLoggedIn = localStorage.getItem("segunda_division_isLoggedIn");
        if (savedIsLoggedIn !== null) {
          setIsLoggedIn(JSON.parse(savedIsLoggedIn));
        }

        const savedUserProfile = localStorage.getItem("segunda_division_userProfile");
        if (savedUserProfile !== null) {
          setUserProfile(JSON.parse(savedUserProfile));
        }

        const savedGuestFavorites = localStorage.getItem("segunda_division_guestFavorites");
        if (savedGuestFavorites !== null) {
          setGuestFavorites(JSON.parse(savedGuestFavorites));
        }

        const savedGuestAds = localStorage.getItem("segunda_division_guestAds");
        if (savedGuestAds !== null) {
          setGuestAds(JSON.parse(savedGuestAds));
        }

        const savedChatSessions = localStorage.getItem("segunda_division_chatSessions");
        if (savedChatSessions !== null) {
          setChatSessions(JSON.parse(savedChatSessions));
        }

        const savedDarkMode = localStorage.getItem("segunda_division_darkMode");
        if (savedDarkMode !== null) {
          setDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (e) {
        console.error("Error loading state from localStorage:", e);
      } finally {
        setIsInitialized(true);
      }
    }, 0);
  }, []);

  // Save states to localStorage when they change, only after initialization is complete
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("segunda_division_isLoggedIn", JSON.stringify(isLoggedIn));
    } catch (e) { console.error(e); }
  }, [isLoggedIn, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("segunda_division_userProfile", JSON.stringify(userProfile));
    } catch (e) { console.error(e); }
  }, [userProfile, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("segunda_division_guestFavorites", JSON.stringify(guestFavorites));
    } catch (e) { console.error(e); }
  }, [guestFavorites, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("segunda_division_guestAds", JSON.stringify(guestAds));
    } catch (e) { console.error(e); }
  }, [guestAds, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("segunda_division_chatSessions", JSON.stringify(chatSessions));
    } catch (e) { console.error(e); }
  }, [chatSessions, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem("segunda_division_darkMode", JSON.stringify(darkMode));
    } catch (e) { console.error(e); }
  }, [darkMode, isInitialized]);

  // Authenticate user & migrate data
  const handleGoogleLogin = () => {
    setIsLoggedIn(true);

    // Migrate favorites from guest to Carlos context
    const updatedFavs = Array.from(new Set([...userProfile.favorites, ...guestFavorites]));
    // Migrate ads from guest to Carlos ads
    const updatedAds = [...userProfile.myAds, ...guestAds];

    setUserProfile((prev) => ({
      ...prev,
      favorites: updatedFavs,
      myAds: updatedAds
    }));

    // Reset guest buffers
    setGuestFavorites([]);
    setGuestAds([]);
    alert("¡Sesión iniciada con Google éxitosamente! Los datos se han migrado del invitado a tu cuenta de Carlos García.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Sesión cerrada.");
  };

  // Toggle favorite helper
  const isFavorite = (productId: string) => {
    if (isLoggedIn) {
      return userProfile.favorites.includes(productId);
    }
    return guestFavorites.includes(productId);
  };

  const toggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isLoggedIn) {
      setUserProfile((prev) => {
        const exist = prev.favorites.includes(productId);
        const newFavs = exist
          ? prev.favorites.filter((id) => id !== productId)
          : [...prev.favorites, productId];
        return { ...prev, favorites: newFavs };
      });
    } else {
      setGuestFavorites((prev) => {
        const exist = prev.includes(productId);
        return exist ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    }
  };

  // Generate dynamic sports description on step 3 with AI router
  const generateAiDescription = async () => {
    if (!newTitle) {
      alert("Introduce un título en el paso 3 antes de generar con Inteligencia Artificial.");
      return;
    }
    setIsGeneratingAiDesc(true);
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          status: newStatus
        })
      });
      const data = await response.json();
      if (data.description) {
        setNewDescription(data.description);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Servicio temporalmente saturado. Generando borrador futbolero offline...");
      setNewDescription(`¡Atención hinchas! Vendo mi ${newTitle} en estado "${newStatus}". Pieza de gran nivel ideal para darlo todo en la cancha o añadir a tu colección de reliquias futboleras de Segunda División. ¡Escríbeme rápido que vuela!`);
    } finally {
      setIsGeneratingAiDesc(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecciona un archivo de imagen válido.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecciona un archivo de imagen válido.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Mock Image Selection for easy listing creation
  const mockImagesTemplates = [
    { title: "Camiseta Betis 1995", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZXfp8ZV7ku9Ul8xIiNJCWGbSxFYw3MN6RrKZsWhzE9r6GIxsXmY1KMM81b1yOi_hABVKDu6Qzl3TEUfUobxkNKJPmvjgYLtWceGfGCzSrX_Pq_W1fh7isBLlu-SbDjIgkwF--n21Jsf2bzPnehg1EPUjfHCvD3mIZmrQ7zind1v4W200k2UWSU1n91w-JQg7XEaxW01vN1eO2lSNrHo0rDTHnRthWnuB0WEZphcmK4we63Se-LL8zrx0oCBsT8w-J-UHmv4h0uXTp" },
    { title: "Botas Clásicas Predator", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP7_v4LyctSokkDUYLsJ9etsupqE1fA-j-0ZOAylwiZw2xZnNO_H4887ty7Z5ZhzN-0nkWdlbLUuDbvtS1j31FuFLFpNxRI6nJ3oDrw_vcFGXTjEssibnp3DnIkmdnnCeY3yRufRoEAEzFimmXgIu4WN_UQzrm_EsOQzKYHeLbwYjGSuQ2ZvUTfIN_DA7CoyVeYw_CEPS7MAcgUrQaeoqvQ_7qIJdkMalyrdsljTcSKwYAMNGUUKxddUgHtXQOEoYcbZogjLfFWrkE" },
    { title: "Balón clásico cuero", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxNAg6krxNhMSW_Ib-FQyXx9hbdimSA_XVt652o9nrPYlEvaAcVmrpuDEK-7ecitEPvKbtU7nRbIBZtW2MfujJ5X0NEViWS7fW0FkrL91RIkGIBw-HF_bLXEXeMMCc1OOwAbrxby-E69V8IYD8H3JxScST1AFl95TJRpoMfvJeJWJoDia6KgLX2LMhTWe2EZMa8OJPN2Kq8SPIz48DYe_uLD2HGMfNqZlhbQivDHKv75WC4TLPUrX-kE1gQOrZOTE5uq9tRNK4NMsG" },
    { title: "Guantes de Oro", url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqMBuMbeSkAHqPlkUXqu4EDUuTbyNS0Da5ysSxapS5KPp3L7OSjlc5cDj8YgtFcyMDkusmmZpDG17LQSv1xCvFbbOqxNVPmUrkDzMDVB3OZhAQBHobf2G3L1vNEneTqdp5FUAfpu7ydwvjSlBped2_Sro46RTwIGQefJdHuRlMg6GoHfyfrCWFADdwahNhcYzLAsQs9tDeo7Lb6Y4toWBFzoDerm62Ff5ai8eshJUgUMBEAv718ta-QOsKVRBTPvyVxskN27t5UO4w" }
  ];

  // Publish Form Submit
  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) {
      alert("Por favor rellena el título y el precio.");
      return;
    }

    const createdProduct: Product = {
      id: "ad-" + (guestAds.length + userProfile.myAds.length + 10),
      title: newTitle,
      price: Number(newPrice),
      category: newCategory,
      status: newStatus,
      seller: isLoggedIn ? userProfile.name : "Invitado",
      location: "Madrid",
      image: newImage || mockImagesTemplates[0].url,
      description: newDescription || "Artículo subido rápido en Segunda División. Escríbeme para más información.",
      featured: false
    };

    if (isLoggedIn) {
      setUserProfile((prev) => ({
        ...prev,
        myAds: [createdProduct, ...prev.myAds]
      }));
    } else {
      setGuestAds((prev) => [createdProduct, ...prev]);
    }

    // Reset selling wizard
    setNewTitle("");
    setNewPrice("");
    setNewDescription("");
    setNewImage("");
    setFormStep(1);
    setIsSellingModalOpen(false);

    // Trigger full screen GOAL animation
    triggerGoalAnimation();
  };

  // Buy now handler
  const handleBuyNow = (e: React.MouseEvent, titleSelected: string) => {
    e.stopPropagation();
    // Complete purchase simulation
    setSelectedProduct(null);
    triggerGoalAnimation();
  };

  // Trigger Full Screen GOOOOOOL animation with auto delay
  const triggerGoalAnimation = () => {
    setShowGoalOverlay(true);
    setTimeout(() => {
      setShowGoalOverlay(false);
    }, 2500);
  };

  // Fraud protection yellow/red card warning trigger
  const triggerRefereeCard = (type: "yellow" | "red", reasonText: string) => {
    setPenaltyCard({ color: type, reason: reasonText });
    setTimeout(() => {
      setPenaltyCard(null);
    }, 4500);
  };

  // Message Sending & Automated Replies
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue || activeChatIndex === null) return;

    const userMsg: Message = {
      sender: "user",
      text: inputValue,
      time: "Ahora"
    };

    const updatedSessions = [...chatSessions];
    updatedSessions[activeChatIndex].messages.push(userMsg);
    setChatSessions(updatedSessions);
    setInputValue("");

    // Simulated quick automated soccer responses
    setTimeout(() => {
      const footballReplies = [
        "¡Entendido crack! Me parece bien, ¿haces envíos?",
        "Buenas, tengo otra oferta pero si me lo dejas 5€ más barato cerramos trato.",
        "Hola, suelo entrenar por las tardes pero podemos quedar el sábado en el campo de fútbol de mi barrio.",
        "Perfecto, está en gran estado tal y como marca el escudo de Segunda División.",
        "Gracias, escríbeme por aquí para coordinar el pago."
      ];
      const replyIdx = (updatedSessions[activeChatIndex]?.messages?.length || 0) % footballReplies.length;
      const randomReply = footballReplies[replyIdx];
      const sellerMsg: Message = {
        sender: "seller",
        text: randomReply,
        time: "Hace 1 min"
      };
      const responseSessions = [...chatSessions];
      responseSessions[activeChatIndex].messages.push(sellerMsg);
      setChatSessions(responseSessions);
    }, 1200);
  };

  // Pre-seed a chat session when writing to seller
  const startChatWithSeller = (product: Product) => {
    const sessionExistIndex = chatSessions.findIndex((s) => s.productId === product.id);
    if (sessionExistIndex !== -1) {
      setActiveChatIndex(sessionExistIndex);
    } else {
      const newSession: ChatSession = {
        productId: product.id,
        productTitle: product.title,
        sellerName: product.seller,
        messages: [
          {
            sender: "seller",
            text: `¡Hola! Me alegro que te interese la ${product.title}. ¿Tienes alguna duda sobre su estado? Está tal y como se ve en las fotos.`,
            time: "Hace 2 mins"
          }
        ]
      };
      setChatSessions((prev) => [...prev, newSession]);
      setActiveChatIndex(chatSessions.length);
    }
    setSelectedProduct(null);
    setActiveProfileTab("messages");
    setIsProfileViewOpen(true);
  };

  // Main list includes both initial seed database & newly created guest/user ads
  const combinedProductsList = [
    ...guestAds,
    ...(isLoggedIn ? userProfile.myAds : []),
    ...products
  ];

  // Filtering products based on category, subcategory and text query input
  const filteredProducts = combinedProductsList.filter((p) => {
    // 1. Text Search query
    if (searchQuery) {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.seller.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
    }

    // 2. Main Categories filtering
    if (selectedCategory === "Destacados") {
      return p.featured === true;
    }

    if (selectedCategory === "Equipaciones") {
      if (p.category !== "Equipaciones") return false;
      if (selectedSubcategory !== "Todos") {
        return p.subcategory === selectedSubcategory;
      }
      return true;
    }

    return p.category === selectedCategory;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-stone-950 text-stone-100" : "bg-white text-stone-800"}`}>
      
      {/* HEADER SECTION - ESTILO BESOCCER */}
      <header className={`sticky top-0 z-40 px-[15px] py-[10px] flex items-center justify-between border-b ${darkMode ? "bg-stone-900 border-stone-800" : "bg-white border-stone-100"}`}>
        <div className="flex items-center gap-[10px]">
          {/* Active shield logo of referee yellows and reds card */}
          <img
            alt="Logo Segunda División"
            className="w-10 h-10 object-contain rounded-[2px]"
            src={logoImage.src}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-emerald-600 font-sans leading-none uppercase">
              SEGUNDA DIVISIÓN
            </h1>
            <span className="text-[10px] tracking-wider uppercase opacity-60 font-medium">EL VESTUARIO DEL FÚTBOL BASE</span>
          </div>
        </div>

        {/* Action Controls Header */}
        <div className="flex items-center gap-[15px]">
          {/* Dark Mode night switch */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full cursor-pointer transition-colors ${darkMode ? "hover:bg-stone-800 text-amber-400" : "hover:bg-stone-100 text-stone-600"}`}
            title="Modo Nocturno"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Autenticación Flow */}
          {!isLoggedIn ? (
            <button
              onClick={handleGoogleLogin}
              className="px-[12px] py-[6px] text-xs font-semibold bg-emerald-600 text-white rounded-[2px] cursor-pointer hover:bg-emerald-700 active:scale-95 transition-all uppercase tracking-wide flex items-center gap-1 shadow-sm"
            >
              <User size={12} />
              Login Google
            </button>
          ) : (
            <div className="flex items-center gap-[10px]">
              {/* Profile click opens custom dashboard drawer */}
              <button
                onClick={() => {
                  setIsProfileViewOpen(true);
                  setActiveProfileTab("listings");
                }}
                className="flex items-center gap-[6px] hover:opacity-80 cursor-pointer"
              >
                <img
                  alt="Carlos García Profile"
                  className="w-8 h-8 rounded-full border border-emerald-500 object-cover"
                  src={userProfile.photo}
                />
                <span className="text-xs font-semibold hidden sm:inline max-w-[100px] truncate">
                  {userProfile.name}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="text-stone-400 hover:text-red-500 transition-colors p-1"
                title="Cerrar sesión"
              >
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SWIPEABLE CATEGORY HORIZONTAL BAR (SCROLLER ON MOBILE) */}
      <nav className={`sticky top-[60px] z-30 flex items-center border-b px-[15px] h-[50px] overflow-x-auto hide-scrollbar ${darkMode ? "bg-stone-900 border-stone-800" : "bg-stone-50 border-stone-100"}`}>
        <div className="flex items-center gap-[10px] w-full min-w-max">
          
          {/* Category Destacados */}
          <button
            onClick={() => {
              setSelectedCategory("Destacados");
              setSelectedSubcategory("Todos");
            }}
            className={`px-[12px] py-[6px] rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              selectedCategory === "Destacados"
                ? "bg-emerald-600 text-white"
                : darkMode
                ? "text-stone-300 hover:bg-stone-800"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Star size={13} fill={selectedCategory === "Destacados" ? "currentColor" : "none"} />
            Destacados
          </button>

          {/* Category Equipaciones con subcategorías inline fluidas */}
          <button
            onClick={() => {
              setSelectedCategory("Equipaciones");
              setSelectedSubcategory("Todos");
            }}
            className={`px-[12px] py-[6px] rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 ${
              selectedCategory === "Equipaciones" && selectedSubcategory === "Todos"
                ? "bg-emerald-600 text-white shadow-sm"
                : selectedCategory === "Equipaciones"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/85 dark:text-emerald-300 border border-emerald-500/30"
                : darkMode
                ? "text-stone-300 hover:bg-stone-800"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Shirt size={13} />
            Equipaciones
          </button>

          {/* Subcategorías expuestas de forma elegante si Equipaciones está activa */}
          {selectedCategory === "Equipaciones" && (
            <div className="flex items-center gap-[6px] animate-fade-in pl-1 border-l border-stone-300 dark:border-stone-700">
              <button
                onClick={() => {
                  setSelectedSubcategory("Todos");
                }}
                className={`px-[10px] py-[4px] rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                  selectedSubcategory === "Todos"
                    ? "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 shadow-xs"
                    : darkMode
                    ? "text-stone-400 hover:bg-stone-800"
                    : "text-stone-500 hover:bg-stone-200"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => {
                  setSelectedSubcategory("Camisetas");
                }}
                className={`px-[10px] py-[4px] rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                  selectedSubcategory === "Camisetas"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : darkMode
                    ? "text-stone-400 hover:bg-stone-800"
                    : "text-stone-500 hover:bg-stone-200"
                }`}
              >
                👕 Camisetas
              </button>
              <button
                onClick={() => {
                  setSelectedSubcategory("Pantalones");
                }}
                className={`px-[10px] py-[4px] rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                  selectedSubcategory === "Pantalones"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : darkMode
                    ? "text-stone-400 hover:bg-stone-800"
                    : "text-stone-500 hover:bg-stone-200"
                }`}
              >
                🩳 Pantalones
              </button>
            </div>
          )}

          {/* Category Botas */}
          <button
            onClick={() => {
              setSelectedCategory("Botas");
              setSelectedSubcategory("Todos");
            }}
            className={`px-[12px] py-[6px] rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              selectedCategory === "Botas"
                ? "bg-emerald-600 text-white"
                : darkMode
                ? "text-stone-300 hover:bg-stone-800"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Sparkle size={13} />
            Botas
          </button>

          {/* Category Coleccionista */}
          <button
            onClick={() => {
              setSelectedCategory("Coleccionista");
              setSelectedSubcategory("Todos");
            }}
            className={`px-[12px] py-[6px] rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              selectedCategory === "Coleccionista"
                ? "bg-emerald-600 text-white"
                : darkMode
                ? "text-stone-300 hover:bg-stone-800"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Sparkles size={13} />
            Coleccionista
          </button>

          {/* Category Decoración */}
          <button
            onClick={() => {
              setSelectedCategory("Decoración");
              setSelectedSubcategory("Todos");
            }}
            className={`px-[12px] py-[6px] rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              selectedCategory === "Decoración"
                ? "bg-emerald-600 text-white"
                : darkMode
                ? "text-stone-300 hover:bg-stone-800"
                : "text-stone-600 hover:bg-stone-200"
            }`}
          >
            <Wallpaper size={13} />
            Decoración
          </button>
        </div>
      </nav>

      {/* HERO SECTION DE BIENVENIDA */}
      <section className="px-[15px] pt-[15px] max-w-7xl mx-auto">
        <div className="relative w-full h-[140px] md:h-[220px] rounded-[20px] overflow-hidden shadow-chromatic relative group">
          <img
            alt="Stadium pitch background"
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-qBL1SwJzES1Kp7uUkL5DnhQPcvfNZ8s2gP6W9I6gwz_bBXGpKZ_xM2tMBj4SIpWFg1M-bcTTUFGQL498ImjUdSPXemV4nQDFDjS7mivft80xBfhNRj_ob4UsgUO8-6iN646UKi4O3l7T2y_aF8S-ne2KBkMI0Z2J8kQ_xf7-skxXYPAjmWgTOP2bZy3_6gJcCQlk8Px-f_BD0kuOs0p6M6cACqE05jFGAVqSHfIf4ppYtEmgc1RW6lR5u-HE9iq9w0zVx1-5Mvia"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-[15px] md:p-[25px]">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">EL MERCADO DE LA NOSTALGIA</span>
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold uppercase font-sans tracking-tight">Tesoros del fútbol base</h2>
            <p className="text-stone-300 text-xs sm:text-sm font-medium">Camisetas de culto, botas de cuero y equipación que merece un segundo tiempo.</p>
          </div>
        </div>
      </section>

      {/* SEARCH AND BARRA DE INFO DE JUEGO LIMPIO */}
      <section className="px-[15px] pt-[20px] max-w-7xl mx-auto flex flex-col md:flex-row gap-[15px]">
        {/* Search Input Bar */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar por equipo, artículo, vendedor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full h-[44px] pl-[40px] pr-[15px] rounded-[2px] border text-sm outline-none transition-all ${
              darkMode
                ? "bg-stone-900 border-stone-800 focus:border-emerald-500 text-white"
                : "bg-white border-stone-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20 text-stone-800"
            }`}
          />
          <Search size={16} className="absolute left-[15px] top-1/2 -translate-y-1/2 text-stone-400" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Juego Limpio Banner */}
        <div className={`p-[10px] rounded-[20px] border flex items-center justify-between gap-3 text-xs md:max-w-md ${
          darkMode ? "bg-stone-900 border-stone-800 text-stone-300" : "bg-stone-50 border-stone-100 text-stone-700"
        }`}>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-emerald-500 shrink-0" />
            <div>
              <p className="font-bold">Zona de Juego Limpio</p>
              <p className="opacity-75">Saca tarjetas amarillas o rojas para avisos.</p>
            </div>
          </div>
          <button
            onClick={() => triggerRefereeCard("red", "Intento de estafa detectado en chat de usuario externo.")}
            className="px-[8px] py-[4px] rounded-[2px] bg-red-600 text-white font-semibold text-[10px] uppercase hover:bg-red-700"
            title="Probar tarjeta de expulsión de árbitro"
          >
            Sacar Roja
          </button>
        </div>
      </section>

      {/* PRODUCT LIST GRID - ESTILO WALLAPOP DOS COLUMNAS MOBILE / CUATRO ESCRITORIO */}
      <main className="px-[15px] py-[20px] max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-[15px]">
          <div>
            <h3 className="text-base sm:text-lg font-bold tracking-tight uppercase">
              {selectedCategory} {selectedSubcategory !== "Todos" ? `> ${selectedSubcategory}` : ""}
            </h3>
            <p className="text-xs opacity-60">Se muestran {filteredProducts.length} productos futboleros</p>
          </div>
          
          {/* Active ads category indicator */}
          {selectedCategory === "Equipaciones" && (
            <span className="text-[11px] font-bold text-emerald-600 tracking-wide bg-emerald-100 rounded-[2px] px-2 py-1 uppercase">
              Fútbol Real
            </span>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm opacity-60">No se encontraron artículos con tus filtros deportivos.</p>
            <button
              onClick={() => {
                setSelectedCategory("Destacados");
                setSelectedSubcategory("Todos");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-[2px] text-xs font-semibold hover:bg-emerald-700 uppercase"
            >
              Ver Destacados
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px]">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setSelectedProduct(p);
                  setDetailPhotoIndex(0);
                }}
                className={`group rounded-[20px] border relative overflow-hidden flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                  darkMode
                    ? "bg-stone-900 border-stone-800 shadow-neutral-950/20 shadow-lg"
                    : "bg-white border-stone-100/80 hover:shadow-chromatic chromatic-shadow"
                }`}
              >
                {/* Product Image and status badge overlay */}
                <div className="aspect-[4/5] relative bg-stone-100 overflow-hidden shrink-0">
                  <img
                    alt={p.title}
                    src={p.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Status Banner */}
                  <span className="absolute top-[8px] left-[8px] bg-stone-900/80 backdrop-blur-xs text-yellow-400 font-semibold px-2 py-0.5 rounded-[2px] text-[10px] tracking-wide uppercase">
                    {p.status}
                  </span>

                  {/* Favorite button toggler */}
                  <button
                    onClick={(e) => toggleFavorite(p.id, e)}
                    className={`absolute top-[8px] right-[8px] p-2 rounded-full backdrop-blur-xs shadow-xs transition-transform hover:scale-110 ${
                      isFavorite(p.id)
                        ? "bg-emerald-600 text-white"
                        : "bg-black/45 text-white hover:bg-black/60"
                    }`}
                  >
                    <Heart size={14} fill={isFavorite(p.id) ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Card Info content */}
                <div className="p-[12px] flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-emerald-500 font-black text-base sm:text-lg tracking-tight font-sans leading-none">{p.price}€</p>
                    <h4 className="font-bold text-xs sm:text-sm mt-1 line-clamp-2 leading-tight tracking-tight min-h-[32px]">
                      {p.title}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100/10 flex flex-col gap-0.5 text-[10px] sm:text-xs text-stone-400">
                    <span className="font-semibold truncate flex items-center gap-1">
                      <User size={10} className="text-emerald-500" />
                      {p.seller}
                    </span>
                    <span className="truncate flex items-center gap-1">
                      <Shield size={10} className="text-yellow-500" />
                      {p.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* AD DETAILS PANEL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] rounded-t-[20px] sm:rounded-b-[20px] overflow-y-auto ${
                darkMode ? "bg-stone-900 text-white" : "bg-white text-stone-800"
              }`}
            >
              {/* Modal header details */}
              <div className="sticky top-0 z-10 px-[15px] py-[10px] border-b flex items-center justify-between bg-inherit">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-1 rounded-[2px] text-xs">
                    {selectedProduct.category}
                  </span>
                  <span className="text-xs font-semibold opacity-75 truncate max-w-[150px]">{selectedProduct.title}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleFavorite(selectedProduct.id, e)}
                    className={`p-2 rounded-full ${isFavorite(selectedProduct.id) ? "bg-emerald-600 text-white" : "bg-stone-150 text-stone-400 hover:text-stone-600"}`}
                  >
                    <Heart size={16} fill={isFavorite(selectedProduct.id) ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + "/?ad=" + selectedProduct.id);
                      alert("¡Enlace de Segunda División copiado al portapapeles futbolero!");
                    }}
                    className="p-2 rounded-full bg-stone-150 text-stone-400 hover:text-stone-600"
                    title="Compartir"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 rounded-full bg-stone-150 text-stone-400 hover:text-stone-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Left: Photos carousel */}
                <div className="p-[15px] flex flex-col gap-2">
                  <div className="aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-stone-100 shadow-inner relative">
                    <img
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                      src={detailPhotoIndex === 0 ? selectedProduct.image : selectedProduct.secondaryImage || selectedProduct.image}
                    />
                    
                    {/* Status condition overlay badge */}
                    <span className="absolute bottom-4 left-4 bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-[2px]">
                      {selectedProduct.status}
                    </span>
                  </div>

                  {/* Selector dots if secondary photos exist */}
                  {selectedProduct.secondaryImage && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDetailPhotoIndex(0)}
                        className={`flex-1 h-14 rounded-[2px] overflow-hidden border-2 ${detailPhotoIndex === 0 ? "border-emerald-500" : "border-transparent"}`}
                      >
                        <img className="w-full h-full object-cover" src={selectedProduct.image} alt="principal" />
                      </button>
                      <button
                        onClick={() => setDetailPhotoIndex(1)}
                        className={`flex-1 h-14 rounded-[2px] overflow-hidden border-2 ${detailPhotoIndex === 1 ? "border-emerald-500" : "border-transparent"}`}
                      >
                        <img className="w-full h-full object-cover" src={selectedProduct.secondaryImage} alt="detalle" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Right: Info descriptions and buyers button */}
                <div className="p-[20px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-1 uppercase">
                        {selectedProduct.title}
                      </h2>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-600">{selectedProduct.price}€</span>
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed opacity-90 font-medium">
                      {selectedProduct.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs border-t border-b py-[10px] my-[10px] opacity-75">
                      <div>
                        <span className="block text-stone-400 uppercase tracking-wide text-[10px]">Ubicación</span>
                        <span className="font-bold">{selectedProduct.location}</span>
                      </div>
                      <div>
                        <span className="block text-stone-400 uppercase tracking-wide text-[10px]">Estado</span>
                        <span className="font-bold">{selectedProduct.status}</span>
                      </div>
                    </div>

                    {/* Vendedor Profile */}
                    <div className={`p-[15px] rounded-[20px] flex items-center justify-between border ${
                      darkMode ? "bg-stone-900 border-stone-800" : "bg-stone-50 border-stone-100"
                    }`}>
                      <div className="flex items-center gap-[10px]">
                        <img
                          alt="seller"
                          className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                          src={selectedProduct.sellerPhoto || "https://lh3.googleusercontent.com/aida-public/AB6AXuDanOnuEs-vIfCubc0-WV6sK2PnftPPEdXfTz_PZ-F6KFNFa51KMqtuaW6n4At7BiFaXUMEgk5K9Bbv1r2V7aey-zjGNpxur3bA2eYV8EZTktOW1v4J_VTw-gJ7vCkoSWKRy8qLTbtk-Q0z8tzqjILWMvqhsw6XYL7aorl17CMuamPFItT5SICo7JNKRfNtUTvT8iwS0VuvWJyNpXNtRfPm6bGpBRwpG7tEnxuEtsfJTbYnc1rLtKGTmrROEThGiNHtoYp2_jVgGsx7"}
                        />
                        <div>
                          <p className="font-bold text-xs sm:text-sm leading-none">{selectedProduct.seller}</p>
                          <div className="flex items-center gap-1 mt-1 text-yellow-500 font-bold text-[10px] sm:text-xs">
                            <span className="flex items-center text-yellow-400">★ {selectedProduct.sellerRating || 4.9}</span>
                            <span className="text-stone-400">({selectedProduct.sellerReviewsCount || 24} valoraciones)</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerRefereeCard("yellow", "Verificación preventiva de reportes sobre el vendedor.")}
                        className="text-[10px] font-bold uppercase text-stone-500 dark:text-stone-400 hover:text-red-500 transition-colors"
                      >
                        Verificar Perfil
                      </button>
                    </div>
                  </div>

                  {/* BUY & MESSAGE BUTTON ACTIONS */}
                  <div className="flex flex-col gap-2 mt-6">
                    <button
                      onClick={(e) => handleBuyNow(e, selectedProduct.title)}
                      className="w-full h-[48px] bg-blue-600 text-white font-bold rounded-[2px] uppercase text-xs tracking-wider hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Comprar ahora
                    </button>
                    
                    <button
                      onClick={() => startChatWithSeller(selectedProduct)}
                      className={`w-full h-[48px] font-bold rounded-[2px] border-2 uppercase text-xs tracking-wider active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        darkMode ? "border-emerald-500 text-emerald-400 hover:bg-stone-800" : "border-emerald-600 text-emerald-600 hover:bg-stone-50"
                      }`}
                    >
                      <MessageSquare size={14} />
                      Enviar mensaje al vendedor
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FLOAT FLOATING "+" BUTTON TO TRIGGER SALE WIZARD */}
      <button
        onClick={() => {
          setFormStep(1);
          setIsSellingModalOpen(true);
        }}
        className="fixed bottom-[80px] md:bottom-[25px] right-[20px] w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-all cursor-pointer z-40 active:scale-90 shadow-lg border-2 border-white/20"
        title="Publicar anuncio"
      >
        <Plus size={32} />
      </button>

      {/* STEP-BY-STEP SALE FORM WIZARD MODAL */}
      <AnimatePresence>
        {isSellingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-lg rounded-[20px] border shadow-2xl p-[20px] overflow-y-auto max-h-[90vh] ${
                darkMode ? "bg-stone-900 border-stone-800 text-white" : "bg-white border-stone-100 text-stone-800"
              }`}
            >
              <div className="flex justify-between items-center pb-[10px] border-b mb-[15px]">
                <h3 className="font-bold text-base sm:text-lg tracking-tight uppercase">Publicar mi artículo</h3>
                <button
                  onClick={() => setIsSellingModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Progress Stepper indicator */}
              <div className="mb-[15px]">
                <div className="flex justify-between text-xs font-semibold mb-1 uppercase opacity-75">
                  <span>Paso {formStep} de 4</span>
                  <span>
                    {formStep === 1 && "Categoría del artículo"}
                    {formStep === 2 && "Fotos del artículo"}
                    {formStep === 3 && "Título y descripción"}
                    {formStep === 4 && "Detalles de venta"}
                  </span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${(formStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handlePublishSubmit}>
                
                {/* STEP 1: CATEGORY SELECTION */}
                {formStep === 1 && (
                  <div className="space-y-[15px]">
                    <p className="text-xs sm:text-sm text-stone-400">Selecciona la mejor categoría deportiva para clasificar tu producto:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Equipaciones", icon: Shirt },
                        { name: "Botas", icon: Sparkle },
                        { name: "Coleccionista", icon: Sparkles },
                        { name: "Decoración", icon: Wallpaper }
                      ].map((cat) => (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => {
                            setNewCategory(cat.name);
                            setFormStep(2);
                          }}
                          className={`p-[15px] rounded-[20px] border-2 flex flex-col items-center justify-center text-center gap-2 hover:border-emerald-500 cursor-pointer transition-all ${
                            newCategory === cat.name
                              ? "bg-emerald-100/50 border-emerald-500 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                              : "border-stone-100/20"
                          }`}
                        >
                          <cat.icon size={24} />
                          <span className="text-xs font-bold uppercase">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2: MOCK UP PHOTO UPLOADS & CUSTOM FILE UPLOADER */}
                {formStep === 2 && (() => {
                  const isCustomImage = newImage && !mockImagesTemplates.some((item) => item.url === newImage);
                  return (
                    <div className="space-y-[15px]">
                      <p className="text-xs sm:text-sm text-stone-400">Sube tu propia imagen o selecciona una plantilla de imagen ilustrativa:</p>
                      
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />

                      {/* Custom Upload Area */}
                      {isCustomImage ? (
                        <div className={`relative aspect-[16/9] w-full rounded-[20px] overflow-hidden border-2 border-emerald-500 shadow-md ${
                          darkMode ? "bg-stone-800" : "bg-stone-100"
                        }`}>
                          <img className="w-full h-full object-cover" src={newImage} alt="Tu imagen subida" />
                          <div className="absolute inset-0 bg-black/50 flex flex-row items-center justify-center opacity-0 hover:opacity-100 transition-opacity gap-3 p-4">
                            <button
                              type="button"
                              onClick={() => {
                                if (fileInputRef.current) fileInputRef.current.click();
                              }}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-md shadow transition-colors cursor-pointer"
                            >
                              Cambiar imagen
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewImage("")}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded-md shadow transition-colors cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase shadow-sm">
                            Tu foto seleccionada ✓
                          </div>
                        </div>
                      ) : (
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => {
                            if (fileInputRef.current) fileInputRef.current.click();
                          }}
                          className={`border-2 border-dashed rounded-[20px] p-[25px] flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                            isDragging
                              ? "border-emerald-500 bg-emerald-500/10 scale-95"
                              : darkMode
                              ? "border-stone-700 bg-stone-900/45 hover:border-emerald-500/50 hover:bg-stone-800/40"
                              : "border-stone-200 bg-stone-50/45 hover:border-emerald-500/50 hover:bg-stone-100/30"
                          }`}
                        >
                          <Upload size={32} className={`mb-2 ${isDragging ? "text-emerald-500 animate-bounce" : "text-stone-400 animate-pulse"}`} />
                          <span className="text-xs font-bold text-stone-300 dark:text-stone-200">
                            Arrastra tu imagen aquí o haz clic para subirla
                          </span>
                          <span className="text-[10px] text-stone-500 mt-1 uppercase font-semibold">
                            Soporta JPG, PNG, WEBP, GIF
                          </span>
                        </div>
                      )}

                      {/* Templates Grid */}
                      <div className="pt-2">
                        <p className="text-xs font-bold text-stone-400 mb-2 uppercase tracking-wide">O elige una plantilla si no tienes foto:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {mockImagesTemplates.map((item) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => {
                                setNewImage(item.url);
                              }}
                              className={`relative aspect-square rounded-[12px] overflow-hidden border-2 cursor-pointer transition-all ${
                                newImage === item.url ? "border-emerald-500 scale-[1.03] shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                              }`}
                              title={item.title}
                            >
                              <img className="w-full h-full object-cover" src={item.url} alt={item.title} />
                              <div className={`absolute inset-0 bg-emerald-500/10 transition-opacity ${newImage === item.url ? "opacity-100" : "opacity-0"}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 justify-between border-t border-stone-100/15 pt-3">
                        <button
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="text-stone-400 text-xs font-bold uppercase hover:text-stone-600"
                        >
                          Atrás
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormStep(3)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-[2px] text-xs font-bold uppercase hover:bg-emerald-700"
                        >
                          Continuar
                        </button>
                      </div>
                    </div>
                  );
                })()}

                {/* STEP 3: TITLE AND GENERATIVE GEMINI IA WRITER */}
                {formStep === 3 && (
                  <div className="space-y-[15px]">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase text-stone-400">Título del anuncio</label>
                      <input
                        type="text"
                        placeholder="Ej: Camiseta Betis 1995 Original"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className={`h-[44px] px-3 rounded-[2px] border text-xs outline-none ${
                          darkMode ? "bg-stone-800 border-stone-700" : "bg-white border-stone-200"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase text-stone-400">Descripción detallada</label>
                        {/* Generative AI content assist */}
                        <button
                          type="button"
                          onClick={generateAiDescription}
                          disabled={isGeneratingAiDesc}
                          className="px-2 py-1 rounded-[2.5px] text-[10px] font-bold uppercase bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-stone-500 transition-colors cursor-pointer flex items-center gap-1"
                          title="Usa el servidor Gemini AI para redactar un anuncio futbolero"
                        >
                          {isGeneratingAiDesc ? "Escribiendo con IA..." : "Redactar con IA 🤖"}
                        </button>
                      </div>

                      <textarea
                        placeholder="Cuéntanos la historia de este artículo, desperfectos, talla, marca o año..."
                        rows={5}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className={`p-3 rounded-[2px] border text-xs outline-none ${
                          darkMode ? "bg-stone-800 border-stone-700" : "bg-white border-stone-200"
                        }`}
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-100/15 pt-3">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="text-stone-400 text-xs font-bold uppercase hover:text-stone-600 font-sans"
                      >
                        Atrás
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormStep(4)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-[2px] text-xs font-bold uppercase hover:bg-emerald-700 inline-block font-sans"
                      >
                        Continuar
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: PRICE AND ITEM CONDITION STATUS */}
                {formStep === 4 && (
                  <div className="space-y-[15px]">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase text-stone-400">Precio de venta (€)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className={`h-[44px] px-3 rounded-[2px] border text-xs outline-none ${
                          darkMode ? "bg-stone-800 border-stone-700 animate-pulse-once" : "bg-white border-stone-200"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold uppercase text-stone-400">Estado del artículo</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className={`h-[44px] px-3 rounded-[2px] border text-xs outline-none cursor-pointer ${
                          darkMode ? "bg-stone-800 border-stone-700" : "bg-white border-stone-200"
                        }`}
                      >
                        <option value="Nuevo con etiquetas">Nuevo con etiquetas</option>
                        <option value="Como nuevo">Como nuevo</option>
                        <option value="Usado - Excelente">Usado - Excelente</option>
                        <option value="Colección">Colección</option>
                        <option value="Usado">Usado</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-100/15 pt-3">
                      <button
                        type="button"
                        onClick={() => setFormStep(3)}
                        className="text-stone-400 text-xs font-bold uppercase hover:text-stone-600"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-emerald-600 text-white rounded-[2px] text-xs font-semibold uppercase hover:bg-emerald-700 cursor-pointer shadow-md"
                      >
                        Publicar anuncio 🚀
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHAT/MESSAGES & PROFILE DASHBOARD VIEW COMPONENT */}
      <AnimatePresence>
        {isProfileViewOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className={`w-full max-w-lg h-full flex flex-col justify-between ${
                darkMode ? "bg-stone-900 text-white border-l border-stone-800" : "bg-white text-stone-800 border-l"
              }`}
            >
              {/* Profile header drawer */}
              <div className="px-[15px] py-[15px] border-b flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                  <img
                    alt="avatar profile big"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                    src={isLoggedIn ? userProfile.photo : "https://lh3.googleusercontent.com/aida-public/AB6AXuDanOnuEs-vIfCubc0-WV6sK2PnftPPEdXfTz_PZ-F6KFNFa51KMqtuaW6n4At7BiFaXUMEgk5K9Bbv1r2V7aey-zjGNpxur3bA2eYV8EZTktOW1v4J_VTw-gJ7vCkoSWKRy8qLTbtk-Q0z8tzqjILWMvqhsw6XYL7aorl17CMuamPFItT5SICo7JNKRfNtUTvT8iwS0VuvWJyNpXNtRfPm6bGpBRwpG7tEnxuEtsfJTbYnc1rLtKGTmrROEThGiNHtoYp2_jVgGsx7"}
                  />
                  <div>
                    <h3 className="font-bold text-sm tracking-tight leading-none uppercase">
                      {isLoggedIn ? userProfile.name : "Invitado Temporal"}
                    </h3>
                    <span className="text-[10px] uppercase opacity-75">
                      {isLoggedIn ? "Miembro verificado " : "Regístrate con Google"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsProfileViewOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs buttons */}
              <div className="flex border-b text-xs font-bold uppercase tracking-wide bg-stone-50 dark:bg-stone-900/30">
                <button
                  onClick={() => setActiveProfileTab("listings")}
                  className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                    activeProfileTab === "listings" ? "border-emerald-600 text-emerald-600" : "border-transparent text-stone-400"
                  }`}
                >
                  Mis Anuncios
                </button>
                <button
                  onClick={() => setActiveProfileTab("favorites")}
                  className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                    activeProfileTab === "favorites" ? "border-emerald-600 text-emerald-600" : "border-transparent text-stone-400"
                  }`}
                >
                  Favoritos
                </button>
                <button
                  onClick={() => setActiveProfileTab("messages")}
                  className={`flex-1 py-3 text-center transition-colors cursor-pointer border-b-2 ${
                    activeProfileTab === "messages" ? "border-emerald-600 text-emerald-600" : "border-transparent text-stone-400"
                  }`}
                >
                  Mensajes
                </button>
              </div>

              {/* Scrollable list of active values */}
              <div className="flex-1 overflow-y-auto p-[15px] space-y-[15px]">
                
                {/* ACTIVE TAB: MY LISTINGS */}
                {activeProfileTab === "listings" && (
                  <div className="space-y-[10px]">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Mis anuncios en el campo</p>
                    {isLoggedIn && userProfile.myAds.length === 0 && guestAds.length === 0 && (
                      <p className="text-xs opacity-60">No tienes anuncios publicados. ¡Saca uno al campo!</p>
                    )}
                    
                    {/* Carlos's Preloaded Active ads list */}
                    {[...(isLoggedIn ? userProfile.myAds : []), ...guestAds].map((ad) => (
                      <div
                        key={ad.id}
                        className={`p-[10px] rounded-[20px] border flex gap-3 items-center ${
                          darkMode ? "bg-stone-850 border-stone-800" : "bg-stone-50 border-stone-100"
                        }`}
                      >
                        <img className="w-12 h-12 rounded-[2px] object-cover" src={ad.image} alt={ad.title} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate uppercase">{ad.title}</p>
                          <p className="text-emerald-500 font-extrabold text-xs">{ad.price}€</p>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 rounded-[2px]">
                          Activo
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* ACTIVE TAB: FAVORITES */}
                {activeProfileTab === "favorites" && (
                  <div className="space-y-[10px]">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Mis favoritos seleccionados</p>
                    {((isLoggedIn ? userProfile.favorites : guestFavorites).length === 0) ? (
                      <p className="text-xs opacity-60">No tienes favoritos seleccionados todavía.</p>
                    ) : (
                      combinedProductsList
                        .filter((p) => isFavorite(p.id))
                        .map((ad) => (
                          <div
                            key={ad.id}
                            className={`p-[10px] rounded-[20px] border flex gap-3 items-center cursor-pointer hover:bg-stone-100/10 ${
                              darkMode ? "bg-stone-850 border-stone-800" : "bg-stone-100/5 border-stone-100"
                            }`}
                            onClick={() => {
                              setSelectedProduct(ad);
                              setIsProfileViewOpen(false);
                            }}
                          >
                            <img className="w-12 h-12 rounded-[2px] object-cover" src={ad.image} alt={ad.title} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold truncate uppercase">{ad.title}</p>
                              <p className="text-emerald-500 font-extrabold text-xs">{ad.price}€</p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(ad.id);
                              }}
                              className="p-1 rounded-full text-red-500 text-xs"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))
                    )}
                  </div>
                )}

                {/* ACTIVE TAB: LIVE CHATS */}
                {activeProfileTab === "messages" && (
                  <div className="space-y-[10px] h-full flex flex-col">
                    {/* Chat selection list */}
                    {activeChatIndex === null ? (
                      <div className="space-y-[10px]">
                        <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Conversaciones activas</p>
                        {chatSessions.length === 0 ? (
                          <p className="text-xs opacity-60 text-center py-6">¡Inicia una conversación preguntando al vendedor en los anuncios!</p>
                        ) : (
                          chatSessions.map((chat, idx) => (
                            <div
                              key={idx}
                              onClick={() => setActiveChatIndex(idx)}
                              className={`p-[15px] rounded-[20px] border cursor-pointer hover:border-emerald-500 transition-colors ${
                                darkMode ? "bg-stone-850 border-stone-800" : "bg-stone-50 border-stone-100"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-xs font-bold text-emerald-600 block mb-1">@{chat.sellerName}</span>
                                <span className="text-[10px] text-stone-400">{chat.messages[chat.messages.length - 1]?.time || "Hace poco"}</span>
                              </div>
                              <p className="text-xs font-black truncate">{chat.productTitle}</p>
                              <p className="text-xs text-stone-400 truncate mt-1">
                                {chat.messages[chat.messages.length - 1]?.text}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col justify-between flex-grow">
                        {/* Conversation Top header back */}
                        <div className="flex items-center gap-2 pb-2 border-b mb-2">
                          <button
                            onClick={() => setActiveChatIndex(null)}
                            className="p-1 text-stone-400 hover:text-stone-600"
                          >
                            <ArrowLeft size={16} />
                          </button>
                          <div>
                            <span className="text-xs font-bold text-emerald-500 block">Conversación con @{chatSessions[activeChatIndex].sellerName}</span>
                            <span className="text-xs font-bold text-stone-400 block truncate max-w-[220px]">
                              {chatSessions[activeChatIndex].productTitle}
                            </span>
                          </div>
                        </div>

                        {/* Speech bubble list thread */}
                        <div className="flex-grow overflow-y-auto space-y-2 p-1 max-h-[300px]">
                          {chatSessions[activeChatIndex].messages.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className={`flex flex-col max-w-[85%] ${m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                            >
                              <div className={`p-2.5 rounded-[20px] text-xs ${
                                m.sender === "user"
                                  ? "bg-emerald-600 text-white rounded-tr-none"
                                  : darkMode
                                  ? "bg-stone-800 text-stone-200 rounded-tl-none"
                                  : "bg-stone-200 text-stone-800 rounded-tl-none"
                              }`}>
                                {m.text}
                              </div>
                              <span className="text-[9px] text-stone-500 mt-0.5">{m.time}</span>
                            </div>
                          ))}
                        </div>

                        {/* Send Message action form input */}
                        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t mt-3">
                          <input
                            type="text"
                            placeholder="Escribe tu mensaje futbolero..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className={`flex-grow h-[40px] px-3 rounded-[2px] border text-xs outline-none ${
                              darkMode ? "bg-stone-800 border-stone-700" : "bg-white border-stone-200"
                            }`}
                          />
                          <button
                            type="submit"
                            className="w-10 h-10 bg-emerald-600 text-white rounded-[2px] flex items-center justify-center hover:bg-emerald-700"
                          >
                            <Send size={14} />
                          </button>
                        </form>
                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* Drawer footer close button */}
              <div className="p-[15px] border-t text-center bg-stone-50 dark:bg-stone-900/60 flex flex-col gap-1.5 opacity-90">
                <p className="text-[10px]">Marketplace de Hinchas para Segunda División</p>
                <button
                  onClick={() => setIsProfileViewOpen(false)}
                  className="w-full py-2 bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-[2px] text-xs font-bold uppercase"
                >
                  Volver al estadio
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER GENERAL DE INFORMACIÓN (BOTTOM NAVIGATION BAR ON MOBILE) */}
      <footer className={`mt-24 border-t text-center py-6 text-xs text-stone-400 px-[15px] ${darkMode ? "bg-stone-950 border-stone-800" : "bg-stone-50 border-stone-100"}`}>
        <p className="font-bold text-emerald-600 uppercase mb-2 tracking-wider">SEGUNDA DIVISIÓN</p>
        <p className="max-w-md mx-auto mb-4 opacity-75 leading-tight">Diseñado con el alma de BeSoccer y la comodidad casual de Wallapop. Cero simulaciones, todo fútbol base certificado.</p>
        <p>© 2026 Segunda División S.L. — Todos los derechos reservados.</p>
      </footer>

      {/* SPECIAL INTERACTIVE POPUP OVERLAYS */}

      {/* 1. BUYING/PUBLISHING COMPLETE TRIGGER : "¡GOOOOOOL!" OVERLAY */}
      <AnimatePresence>
        {showGoalOverlay && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
            {/* Confetti falling animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 35 }).map((_, i) => {
                const posX = (i * 27) % 300 - 150;
                const animX = (i * 43) % 400 - 200;
                const delayValue = ((i * 13) % 20) / 10;
                const bgColors = ["bg-yellow-400", "bg-emerald-500", "bg-blue-500", "bg-red-500", "bg-pink-500", "bg-amber-400"];
                const colorClass = bgColors[i % bgColors.length];
                const leftPercent = (i * 17) % 100;
                return (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: posX, rotate: 0 }}
                    animate={{ y: 800, rotate: 360, x: animX }}
                    transition={{ duration: 2.2, delay: delayValue, repeat: Infinity, ease: "linear" }}
                    className={`absolute w-3 h-3 rounded-full ${colorClass}`}
                    style={{ left: `${leftPercent}%` }}
                  />
                );
              })}
            </div>

            <motion.div
              initial={{ scale: 0.6, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.55 }}
              className="text-center z-10"
            >
              <h1 className="text-white text-5xl sm:text-7xl font-black tracking-widest uppercase mb-4 italic animate-bounce font-sans selection:text-white">
                ¡GOOOOOOL!
              </h1>
              <p className="text-stone-300 text-sm sm:text-base font-bold uppercase tracking-widest">
                Trato realizado y anotado en el acta oficial de la liga.
              </p>
              <div className="mt-4 flex justify-center">
                <span className="w-16 h-1 w-white bg-emerald-500 rounded-full"></span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. PENALTY CRITICAL WARNING DRAWER - YELLOW OR RED REFEREE CARD */}
      <AnimatePresence>
        {penaltyCard && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-end p-6 bg-black/5">
            <motion.div
              initial={{ x: "120%", rotate: 15 }}
              animate={{ x: 0, rotate: -5 }}
              exit={{ x: "120%", rotate: 15 }}
              transition={{ type: "spring", damping: 15, stiffness: 180 }}
              className={`w-72 p-6 rounded-[20px] shadow-2xl relative border-4 flex flex-col justify-between h-96 select-none pointer-events-auto ${
                penaltyCard.color === "yellow"
                  ? "bg-yellow-400 text-stone-900 border-yellow-500"
                  : "bg-red-600 text-white border-red-700"
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[12px] font-bold tracking-widest uppercase">Árbitro Oficial</span>
                <span className="material-symbols-outlined text-xl">⚠️</span>
              </div>

              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight leading-none italic font-sans selection:text-white">
                  {penaltyCard.color === "yellow" ? "TARJETA AMARILLA" : "EXPULSIÓN ROJA"}
                </h3>
                <p className="text-xs font-bold leading-tight mt-3">
                  Motivo: {penaltyCard.reason}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold tracking-wider uppercase opacity-80 border-t pt-2 border-current">
                  Segunda División — Juego Limpio Certificado
                </p>
              </div>

              {/* Graphic representations of cards floating */}
              <div className="absolute top-10 right-4 w-4 h-6 bg-current rounded-xs opacity-25 rotate-12"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
