// src/app/[lang]/exercises/ExerciseList.tsx
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
import { Input } from '@/components/ui/input';
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
import { Search, Filter, Play } from 'lucide-react';
import { ExerciseImage } from '@/components/ExerciseImage';

const getMuscleGroups = (lang: string) => {
  const isArabic = lang === 'ar';
  // In production, you could also fetch this from API
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

const getDifficultyLabel = (level: string, lang: string) => {
  const isArabic = lang === 'ar';
  if (level === 'beginner') return isArabic ? 'مبتدئ' : 'Beginner';
  if (level === 'intermediate') return isArabic ? 'متوسط' : 'Intermediate';
  return isArabic ? 'متقدم' : 'Advanced';
};

export function ExerciseList({ lang }: { lang: string }) {
  const isArabic = lang === 'ar';
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [open, setOpen] = useState(false);

  // ✅ Fetch real data from Django backend
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/exercises?lang=${lang}`);
        if (res.ok) {
          const data = await res.json();
          // Map Django fields to frontend format
          const formatted = data.map((ex: any) => ({
            id: ex.id,
            name: ex.name,
            description: ex.description,
            group: ex.category, // assuming category = muscle group
            difficulty: ex.difficulty,
            image: `https://source.unsplash.com/600x400/?${ex.category?.toLowerCase() || 'fitness'},gym`,
            videoUrl: ex.video_url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // fallback
            instructions: ex.instructions || [],
          }));
          setExercises(formatted);
        }
      } catch (err) {
        console.error('Failed to fetch exercises', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [lang]);

  const filtered = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = group === 'all' || ex.group?.toLowerCase().includes(group);
    return matchesSearch && matchesGroup;
  });

  const handleViewInstructions = (ex: any) => {
    setSelectedExercise(ex);
    setOpen(true);
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
          <Input
            placeholder={isArabic ? 'ابحث عن تمرين...' : 'Search exercise...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={isArabic ? 'pl-10 pr-4' : 'pl-10'}
          />
        </div>
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger>
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
                  src={ex.image}
                  alt={ex.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className={isArabic ? 'text-right' : 'text-left'}>{ex.name}</CardTitle>
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

              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <ExerciseImage
                  src={selectedExercise.image}
                  alt={selectedExercise.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <a
                href={selectedExercise.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline mb-4"
              >
                <Play className="h-4 w-4" />
                {isArabic ? 'عرض فيديو توضيحي' : 'Watch Demo Video'}
              </a>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">
                  {isArabic ? 'المجموعة العضلية' : 'Muscle Group'}: {selectedExercise.group}
                </Badge>
                <Badge variant="outline">
                  {getDifficultyLabel(selectedExercise.difficulty, lang)}
                </Badge>
                <Badge variant="default">
                  {isArabic ? '٥ مجموعات × ٥ تكرارات' : '5 Sets × 5 Reps'}
                </Badge>
              </div>

              <h3 className="font-semibold mb-2">
                {isArabic ? 'التعليمات' : 'Instructions'}
              </h3>
              <ol className={isArabic ? 'list-decimal pr-5 space-y-2 text-right' : 'list-decimal pl-5 space-y-2'}>
                {selectedExercise.instructions.map((inst: string, i: number) => (
                  <li key={i} className="text-muted-foreground">{inst}</li>
                ))}
              </ol>

              <DialogFooter className="mt-6">
                <Button
                  onClick={() => {
                    // TODO: Add to user plan via API
                    alert(lang === 'ar' ? 'تمت الإضافة إلى خطتك!' : 'Added to your plan!');
                  }}
                  className="w-full mb-2"
                >
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