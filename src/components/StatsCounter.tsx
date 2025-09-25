import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Clock, Trophy } from 'lucide-react';
import { supabase, getTicketStats } from '../lib/supabase';

const StatsCounter: React.FC = () => {
  const { t } = useTranslation();
  const [participations, setParticipations] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch real participation count from database
  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        // Récupérer les statistiques des tickets directement
        const ticketStats = await getTicketStats();
        const baseParticipations = 147; // Base de participants existants
        
        // Chaque ticket = 1 participation (les tickets sont déjà générés selon le type)
        const totalParticipations = baseParticipations + ticketStats.totalTickets;
        
        setParticipations(totalParticipations);
      } catch (error) {
        console.error('Error fetching participations:', error);
      }
    };

    // Fetch initial data
    fetchParticipations();

    // Set up real-time subscription for new orders
    const subscription = supabase
      .channel('tickets_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tickets'
        },
        () => {
          // Refetch when tickets change
          fetchParticipations();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    // 31 octobre 2025 à 23:59:00 heure de Paris (UTC+1/UTC+2)
    const targetDate = new Date('2025-10-31T23:59:00+02:00');
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // Si la date limite est dépassée
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <img
              src="/iphone5.png"
              alt="iPhone"
              className="w-64 h-auto opacity-80 drop-shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold shadow-lg">
              Jackpot !
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {/* Participations */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <div className="text-4xl font-bold mb-2">{participations.toLocaleString()}</div>
            <p className="text-blue-100">{t('stats.participations')}</p>
          </div>

          {/* Countdown */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
            <Clock className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
              <>
                <div className="text-2xl font-bold mb-2">
                  {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </div>
                <p className="text-blue-100">{t('stats.timeLeft')}</p>
              </>
            ) : (
              <>
                <div className="text-xl font-bold mb-2 text-red-300">
                  {t('stats.ended')}
                </div>
                <p className="text-blue-100">{t('stats.drawingSoon')}</p>
              </>
            )}
          </div>

          {/* Prize Value */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
            <div className="text-4xl font-bold mb-2">
              <span className="line-through text-gray-300">1 479 €</span>
            </div>
            <div className="text-lg font-semibold text-yellow-400 mb-2">
              à partir de 5,99€ pour le remporter !
            </div>
            <p className="text-blue-100">{t('stats.prizeValue')}</p>
          </div>
        </div>

        <div className="text-center mt-12">
          {timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0 ? (
            <button
              onClick={scrollToPricing}
              className="inline-flex items-center bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              {t('stats.hurryUp', { days: timeLeft.days })}
            </button>
          ) : (
            <div className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-full font-bold">
              {t('stats.closed')}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;