import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
export default function Home() {
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted");
  };
  return (
    <div className="">
      <form action="">
        <Card>
          <Label>Question</Label>
          <Input placeholder="Question" />
          <Label>Answer</Label>
          <Textarea placeholder="solution.." />
        </Card>
        <Button onClick={handleSubmit} />
      </form>
    </div>
  );
}
