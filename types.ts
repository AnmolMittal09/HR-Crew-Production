// Fix: Import React to resolve "Cannot find namespace 'React'" error
import React from 'react';

export interface LineItem {
  id: number;
  description: string;
  quantity: number;
  rate: number;
}

export interface ClientDetails {
  name: string;
  email: string;
  projectName: string;
  projectType: 'Music' | 'Video' | 'Both';
  date: string;
  notes: string;
}

export enum DocType {
  INVOICE = 'INVOICE',
  QUOTATION = 'QUOTATION'
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}