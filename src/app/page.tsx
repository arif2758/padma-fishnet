"use client";

import { Button, Card, Typography, Row, Col, Space } from "antd";
import Link from "next/link";
import Image from "next/image";
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useRef, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { Title, Paragraph, Text } = Typography;

const features = [
  {
    icon: <SafetyCertificateOutlined className="text-4xl" />,
    title: "Quality Assurance",
    description:
      "Ensure the highest quality standards in fishing net production and maintenance.",
    color: "text-blue-500",
  },
  {
    icon: <TeamOutlined className="text-4xl" />,
    title: "Expert Team",
    description:
      "Our skilled team brings years of experience in fishing net craftsmanship.",
    color: "text-green-500",
  },
  {
    icon: <ToolOutlined className="text-4xl" />,
    title: "Professional Tools",
    description:
      "Using state-of-the-art tools and techniques for perfect results.",
    color: "text-orange-500",
  },
  {
    icon: <RocketOutlined className="text-4xl" />,
    title: "Fast Delivery",
    description: "Quick turnaround time with efficient task management system.",
    color: "text-purple-500",
  },
];

function Home() {
  const featuresRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -100,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(".hero-title", {
      opacity: 0,
      y: -50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".hero-desc", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1,
      ease: "power3.out",
    });

    gsap.from(".hero-buttons", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });

    // Features Section Animations
    gsap.context(() => {
      document.querySelectorAll(".feature-div").forEach((div) => {
        gsap.from(div, {
          y: 100,
          opacity: 0,
          duration: 2,
          delay: 0.2,
          ease: "sine.out",
          scrollTrigger: {
            trigger: div,
            start: "top 80%",
            toggleActions: "restart none none reset",
          },
        });
      });
    }, featuresRef);

    // About Section Animations
    gsap.from(aboutRef.current, {
      opacity: 0,
      x: -200,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    gsap.from(ctaRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });

    return () => {
      // Cleanup GSAP
      gsap.killTweensOf(heroRef);
      gsap.killTweensOf(featuresRef);
      gsap.killTweensOf(aboutRef);
      gsap.killTweensOf(ctaRef);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[800px] mb-16">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/logo-padma-fishing-net.png"
            alt="Fishing Net Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="hero-title">
            <Title
              style={{
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
              className="mb-6"
            >
              Padma Fishing Net Management System
            </Title>
          </div>
          <div className="hero-desc">
            <Paragraph
              style={{ color: "white" }}
              className="text-gray-200 text-lg max-w-2xl mb-8"
            >
              Professional fishing net manufacturing and maintenance service
              with state-of-the-art task management system
            </Paragraph>
          </div>
          <div className="hero-buttons">
            <Space size="large">
              <Link href="/admin">
                <Button
                  type="primary"
                  size="large"
                  icon={<TeamOutlined />}
                  className="transform hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg"
                >
                  Admin Dashboard
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  size="large"
                  className="bg-white transform hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg"
                  icon={<SafetyCertificateOutlined />}
                >
                  View Profile
                </Button>
              </Link>
            </Space>
          </div>
        </div>
      </div>{" "}
      {/* Features Section */}
      <div ref={featuresRef} className="container mx-auto px-4 mb-16">
        <div className="features-title">
          <Title
            level={2}
            className="text-center mb-12 relative"
            style={{ scrollBehavior: "smooth" }}
          >
            Our Features
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-500"></div>
          </Title>
        </div>{" "}
        <Row gutter={[24, 24]} className="features-grid">
          {features.map((feature, index) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              key={index}
              className={`feature-wrapper-${index}`}
            >
              <Card
                className="feature-div h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                variant="borderless"
              >
                <div className="text-center">
                  <div
                    className={`feature-icon relative inline-block ${feature.color}`}
                  >
                    {feature.icon}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-current opacity-20 rounded-full blur-sm"></div>
                  </div>
                  <Title level={4} className="feature-title mt-4 mb-2">
                    {feature.title}
                  </Title>
                  <Text className="feature-desc text-gray-600">
                    {feature.description}
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {/* About Section */}
      <div ref={aboutRef} className="bg-gray-50 py-20 mb-16">
        <div className="container mx-auto px-4">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div className="about-image relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/logo-padma-fishing-net.png"
                  alt="Fishing Net Work"
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="about-content">
                <Title level={2} className="mb-6">
                  Why Choose Us?
                </Title>
                <Paragraph className="text-lg text-gray-600 mb-8">
                  With years of experience in the fishing net industry, we
                  provide top-quality manufacturing and maintenance services.
                  Our advanced task management system ensures efficient workflow
                  and timely delivery.
                </Paragraph>
                <Space direction="vertical" size="large" className="w-full">
                  <div className="flex items-center gap-3">
                    <SafetyCertificateOutlined className="text-2xl text-green-500" />
                    <Text strong>Quality Guaranteed</Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <TeamOutlined className="text-2xl text-blue-500" />
                    <Text strong>Expert Craftsmen</Text>
                  </div>
                  <div className="flex items-center gap-3">
                    <RocketOutlined className="text-2xl text-purple-500" />
                    <Text strong>Fast Turnaround</Text>
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* CTA Section */}
      <div ref={ctaRef} className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 py-20 relative overflow-hidden backdrop-blur-sm border-t border-b border-blue-100/20">
        <div className="container mx-auto px-4 text-center relative">
          <Title level={2} className="text-gray-800 mb-6 tracking-wide">
            Ready to Get Started?
          </Title>
          <Paragraph className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join our platform to manage your fishing net tasks efficiently and
            professionally.
          </Paragraph>
          <Link href="/admin">
            <Button
              type="primary"
              size="large"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
