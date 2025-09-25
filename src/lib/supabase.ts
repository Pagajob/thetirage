import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour le système d'affiliation
export interface Promoter {
  id: string;
  user_id: string;
  promo_code: string;
  stripe_promotion_code_id?: string;
  commission_rate: number;
  total_commission: number;
  total_sales: number;
  total_revenue: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AffiliateSale {
  id: string;
  promoter_id: string;
  checkout_session_id: string;
  customer_email?: string;
  amount: number;
  commission_amount: number;
  product_name?: string;
  created_at: string;
}

export interface PromoterStats {
  promoter: {
    promo_code: string;
    commission_rate: number;
    is_active: boolean;
    created_at: string;
  };
  stats: {
    total_sales: number;
    total_revenue: number;
    total_commission: number;
    commission_rate: number;
  };
  recent_sales: AffiliateSale[];
  stripe_validation: {
    usage_count: number;
    total_amount: number;
  };
}

// Types pour la gestion des tickets
export interface Ticket {
  id: string;
  email: string;
  ticket_code: string;
  session_id: string;
  ticket_type: 'Bronze' | 'Silver' | 'Gold';
  amount_paid: number;
  created_at: string;
  is_winner: boolean;
  draw_date: string;
}

// Fonction pour récupérer les tickets d'un utilisateur par email
export async function getUserTickets(email: string): Promise<Ticket[]> {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user tickets:', error);
    return [];
  }

  return data || [];
}

// Fonction pour récupérer les statistiques des tickets
export async function getTicketStats() {
  const { data, error } = await supabase
    .from('tickets')
    .select('ticket_type, created_at')
    .gte('draw_date', new Date().toISOString().split('T')[0]); // Tickets du mois en cours

  if (error) {
    console.error('Error fetching ticket stats:', error);
    return {
      totalTickets: 0,
      bronzeTickets: 0,
      silverTickets: 0,
      goldTickets: 0
    };
  }

  const stats = {
    totalTickets: data.length,
    bronzeTickets: data.filter(t => t.ticket_type === 'Bronze').length,
    silverTickets: data.filter(t => t.ticket_type === 'Silver').length,
    goldTickets: data.filter(t => t.ticket_type === 'Gold').length
  };

  return stats;
}