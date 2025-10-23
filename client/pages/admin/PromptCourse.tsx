import { useState } from "react";
import { ChevronRight, ChevronDown, BookOpen, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { courseContent, contentData } from "@/data/promptCourseContent";

export default function PromptCourse() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["introduction"]);
  const [activeContent, setActiveContent] = useState("intro-basics");

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSubsectionClick = (subsectionId: string) => {
    setActiveContent(subsectionId);
  };

  const currentContent = contentData[activeContent] || contentData["intro-basics"];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <Link to="/admin" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <Home className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <h2 className="font-semibold">Prompt Engineering Guide</h2>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="p-2">
            {courseContent.sections.map((section) => (
              <div key={section.id} className="mb-1">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
                >
                  <span>{section.title}</span>
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>

                {expandedSections.includes(section.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {section.subsections.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => handleSubsectionClick(subsection.id)}
                        className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors ${
                          activeContent === subsection.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent text-muted-foreground"
                        }`}
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{currentContent.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">On This Page</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-slate dark:prose-invert max-w-none">
              <div 
                className="space-y-4 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: currentContent.content
                    .split('\n\n')
                    .map(para => {
                      // Handle bold text
                      para = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      
                      // Handle list items
                      if (para.trim().startsWith('- ')) {
                        const items = para.split('\n').filter(line => line.trim().startsWith('- '));
                        return '<ul class="list-disc list-inside space-y-2 my-4">' + 
                          items.map(item => '<li>' + item.substring(2) + '</li>').join('') + 
                          '</ul>';
                      }
                      
                      // Handle code blocks
                      if (para.includes('**Example:**')) {
                        return '<h3 class="text-xl font-semibold mt-6 mb-3">' + para + '</h3>';
                      }
                      
                      // Regular paragraphs
                      return '<p class="mb-4">' + para + '</p>';
                    })
                    .join('')
                }}
              />
            </article>
          </div>
        </ScrollArea>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <aside className="w-64 border-l bg-card p-4 hidden xl:block">
        <h3 className="font-semibold mb-4">On This Page</h3>
        <div className="space-y-2 text-sm">
          <a href="#" className="block text-muted-foreground hover:text-foreground">
            Want to learn more?
          </a>
          <a href="#" className="block text-muted-foreground hover:text-foreground">
            Question? Give us feedback →
          </a>
          <a href="#" className="block text-muted-foreground hover:text-foreground">
            Edit this page
          </a>
        </div>
      </aside>
    </div>
  );
}
