"use client";

import { useState } from "react";
import { diagramBotDemo } from "@/ai/flows/diagram-bot-demo";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type Inputs = {
  topic: string;
};

export function DiagramBot() {
  const [diagram, setDiagram] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true);
    setDiagram(null);
    try {
      const result = await diagramBotDemo(data);
      if (result?.diagram) {
        setDiagram(result.diagram);
      } else {
        throw new Error("Failed to generate diagram.");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not generate the diagram. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-start">
        <div className="flex-grow">
          <Input
            {...register("topic", { required: "Topic is required" })}
            placeholder="Enter a topic, e.g., 'Client-Server Architecture'"
            className="bg-transparent border-white/20 placeholder:text-muted-foreground/60"
          />
          {errors.topic && (
            <p className="text-red-400 text-sm mt-1">{errors.topic.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Generate
        </Button>
      </form>

      {diagram && (
        <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/10">
          <h4 className="font-bold text-sm mb-2">Generated Diagram:</h4>
          <pre className="text-sm whitespace-pre-wrap font-code text-accent">
            {diagram}
          </pre>
        </div>
      )}
    </div>
  );
}
