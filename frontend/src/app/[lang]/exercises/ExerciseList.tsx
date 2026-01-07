'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Search, Filter, Play, Dumbbell, Target, Package as Tool, Repeat } from 'lucide-react';import { ExerciseImage } from '@/components/ExerciseImage';

// Types
type Exercise = {
  id: number;
  name: string;
  description: string;
  instructions: string[];
  category: string;
  difficulty: string;
  demo_video_url: string;
  exercise?: {
    main_muscle: string;
    equipment: string;
    mechanics: string;
  };
};

// Helper: Get muscle groups
const getMuscleGroups = (lang: string) => {
  const isArabic = lang === 'ar';
  return [
    { value: 'all', label: isArabic ? 'الكل' : 'All' },
    { value: 'chest', label: isArabic ? 'الصدر' : 'Chest' },
    { value: 'back', label: isArabic ? 'الظهر' : 'Back' },
    { value: 'legs', label: isArabic ? 'الفخذين' : 'Legs' },
    { value: 'shoulders', label: isArabic ? 'الكتفين' : 'Shoulders' },
    { value: 'abs', label: isArabic ? 'البطن' : 'Abs' },
    { value: 'arms', label: isArabic ? 'الذراعين' : 'Arms' },
    { value: 'buttocks', label: isArabic ? 'الألوية' : 'Buttocks' },
    { value: 'cardio', label: isArabic ? 'الكارديو' : 'Cardio' },
    { value: 'stretches', label: isArabic ? 'التمديدات' : 'Stretches' },
  ];
};

// Helper: Get difficulty label
const getDifficultyLabel = (level: string, lang: string): string => {
  const isArabic = lang === 'ar';
  switch (level) {
    case 'beginner':
      return isArabic ? 'مبتدئ' : 'Beginner';
    case 'intermediate':
      return isArabic ? 'متوسط' : 'Intermediate';
    default:
      return isArabic ? 'متقدم' : 'Advanced';
  }
};

// Helper: Get equipment label
const getEquipmentLabel = (equipment: string, lang: string): string => {
  const labels: Record<string, Record<string, string>> = {
    'bodyweight': { en: 'Bodyweight', ar: 'بوزن الجسم', fr: 'Poids de corps' },
    'barbell': { en: 'Barbell', ar: 'البار', fr: 'Barre' },
    'dumbbell': { en: 'Dumbbell', ar: 'دمبل', fr: 'Haltère' },
    'machine': { en: 'Machine', ar: 'آلة', fr: 'Machine' },
    'cable': { en: 'Cable', ar: 'كابل', fr: 'Câble' },
  };
  return labels[equipment]?.[lang] || equipment;
};

// Main Component
export function ExerciseList({ lang }: { lang: string }) {
  const isArabic = lang === 'ar';
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch exercises from Django
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/exercises?lang=${lang}`);
        if (res.ok) {
          const data = await res.json();
          setExercises(data);
        }
      } catch (err) {
        console.error('Failed to fetch exercises', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [lang]);

  // Filter logic
  const filtered = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = group === 'all' || ex.category?.toLowerCase().includes(group);
    return matchesSearch && matchesGroup;
  });

  // Handle view instructions
  const handleViewInstructions = (ex: Exercise) => {
    setSelectedExercise(ex);
    setOpen(true);
  };

  // Handle "Add to Plan"
  const handleAddToPlan = async () => {
    if (!selectedExercise) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      alert(isArabic ? 'يرجى تسجيل الدخول أولاً.' : 'Please log in first.');
      setOpen(false);
      window.location.href = `/${lang}/login?next=/${lang}/exercises`;
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/user-plans/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ exercise_id: selectedExercise.id }),
      });

      if (res.ok) {
        alert(isArabic ? 'تمت الإضافة إلى خطتك!' : 'Added to your plan!');
      } else {
        const err = await res.json();
        alert(`${isArabic ? 'خطأ:' : 'Error:'} ${JSON.stringify(err)}`);
      }
    } catch (error) {
      console.error('Add to plan error:', error);
      alert(isArabic ? 'فشل في الإضافة. حاول مرة أخرى.' : 'Failed to add. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <p>{isArabic ? 'جاري التحميل...' : 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">
          {isArabic ? 'مكتبة التمارين' : 'Exercise Library'}
        </h1>
        <p className="text-muted-foreground">
          {isArabic ? 'تمارين مفصلة مع صور وفيديوهات' : 'Detailed exercises with images & videos'}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="grid gap-4 mb-8 md:grid-cols-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder={isArabic ? 'ابحث عن تمرين...' : 'Search exercise...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-md border px-4 py-2 pl-10 ${isArabic ? 'text-right' : 'text-left'}`}
          />
        </div>
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger className={isArabic ? 'text-right' : 'text-left'}>
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={isArabic ? 'اختر المجموعة' : 'Select muscle group'} />
          </SelectTrigger>
          <SelectContent>
            {getMuscleGroups(lang).map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Exercises Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            {isArabic ? 'لم يتم العثور على تمارين' : 'No exercises found'}
          </p>
        ) : (
          filtered.map((ex) => (
            <Card
              key={ex.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0"
            >
              <div className="h-56 overflow-hidden">
                <ExerciseImage
                  src={`https://source.unsplash.com/600x400/?${ex.category},${lang}`}
                  alt={ex.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>
                    {ex.name}
                  </CardTitle>
                  <Badge
                    variant={
                      ex.difficulty === 'beginner'
                        ? 'default'
                        : ex.difficulty === 'intermediate'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {getDifficultyLabel(ex.difficulty, lang)}
                  </Badge>
                </div>
                <CardDescription className={isArabic ? 'text-right' : 'text-left'}>
                  {ex.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium"
                  onClick={() => handleViewInstructions(ex)}
                >
                  {isArabic ? 'عرض التعليمات الكاملة' : 'View Full Instructions'}
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Full Instructions Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedExercise && (
            <>
              <DialogHeader>
                <DialogTitle className={isArabic ? 'text-right' : 'text-left'}>
                  {selectedExercise.name}
                </DialogTitle>
              </DialogHeader>

              {/* Image */}
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <ExerciseImage
                  src={`https://source.unsplash.com/600x400/?${selectedExercise.category},${lang}`}
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Demo */}
              {selectedExercise.demo_video_url && (
                <a
                  href={selectedExercise.demo_video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline mb-4"
                >
                  <Play className="h-4 w-4" />
                  {isArabic ? 'عرض فيديو توضيحي' : 'Watch Demo Video'}
                </a>
              )}

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className={isArabic ? 'text-right' : 'text-left'}>
                    <span className="font-medium">
                      {isArabic ? 'المجموعة العضلية:' : 'Muscle Group:'}
                    </span>{' '}
                    {selectedExercise.exercise?.main_muscle || selectedExercise.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className={isArabic ? 'text-right' : 'text-left'}>
                    <span className="font-medium">{isArabic ? 'المستوى:' : 'Level:'}</span>{' '}
                    {getDifficultyLabel(selectedExercise.difficulty, lang)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tool className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className={isArabic ? 'text-right' : 'text-left'}>
                    <span className="font-medium">{isArabic ? 'الأداة:' : 'Equipment:'}</span>{' '}
                    {getEquipmentLabel(
                      selectedExercise.exercise?.equipment || 'bodyweight',
                      lang
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Repeat className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className={isArabic ? 'text-right' : 'text-left'}>
                    <span className="font-medium">{isArabic ? 'النوع:' : 'Type:'}</span>{' '}
                    {selectedExercise.exercise?.mechanics === 'compound'
                      ? isArabic
                        ? 'مركب'
                        : 'Compound'
                      : isArabic
                      ? 'عزل'
                      : 'Isolation'}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <h3 className="font-semibold mb-2">{isArabic ? 'التعليمات' : 'Instructions'}</h3>
              <ol
                className={
                  isArabic
                    ? 'list-decimal pr-5 space-y-2 text-right'
                    : 'list-decimal pl-5 space-y-2 text-left'
                }
              >
                {selectedExercise.instructions.length > 0 ? (
                  selectedExercise.instructions.map((inst, i) => (
                    <li key={i} className="text-muted-foreground">
                      {inst}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">
                    {isArabic ? 'لا توجد تعليمات متوفرة.' : 'No instructions available.'}
                  </li>
                )}
              </ol>

              {/* Action Buttons */}
              <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
                <Button onClick={handleAddToPlan} className="w-full">
                  {isArabic ? 'أضف إلى خطتي' : 'Add to My Plan'}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="w-full">
                    {isArabic ? 'إغلاق' : 'Close'}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}