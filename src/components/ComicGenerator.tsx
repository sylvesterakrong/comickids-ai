import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ComicGenerator({ prompt: initialPrompt = "" }: { prompt?: string }) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [finalComic, setFinalComic] = useState<{ image_url: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateComic = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setFinalComic(null);

    try {
      const res = await fetch("/api/generate-comic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate comic");
      }

      const data = await res.json();

      if (data.error) {
        toast({ description: "Something went wrong. Try again." });
        return;
      }

      // Expecting data.image_url and data.title from Django
      setFinalComic({ image_url: data.image_url, title: data.title });
    } catch (error) {
      console.error(error);
      toast({ description: "Error generating comic" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">ComicKids AI</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="prompt">Enter your story prompt</Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A child learning to farm with Grandpa"
            className="mt-1"
          />
        </div>

        <Button onClick={handleGenerateComic} disabled={loading || !prompt.trim()} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Comic"
          )}
        </Button>
      </div>

      {/* Loading Placeholder */}
      {loading && (
        <div className="mt-10 flex flex-col items-center">
          <div className="animate-pulse bg-muted aspect-[4/3] w-full max-w-lg rounded-xl h-64" />
          <p className="mt-4 text-muted-foreground">Generating your comic...</p>
        </div>
      )}

      {/* Final Comic */}
      {finalComic && (
        <div className="mt-10 border rounded-xl overflow-hidden shadow-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-center">{finalComic.title}</h2>
          <img src={finalComic.image_url} alt={finalComic.title} className="w-full object-cover" />
          <div className="flex justify-center gap-2 mt-4 mb-2">
            <Button
              variant="outline"
              onClick={() => {
                const link = document.createElement("a");
                link.href = finalComic.image_url;
                link.download = `${finalComic.title || "comic-kids-panel"}.jpg`;
                link.click();
                toast({ description: "Comic downloaded!" });
              }}
            >
              Download
            </Button>
            <Button
              variant="secondary"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: finalComic.title,
                      text: "Check out this comic I made with ComicKids AI!",
                      url: finalComic.image_url,
                    });
                  } catch (err) {
                    console.error("Sharing failed:", err);
                  }
                } else {
                  alert("Sharing not supported on this browser.");
                }
              }}
            >
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
