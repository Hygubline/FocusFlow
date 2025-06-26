import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, BarChart3, Settings, LogIn, Trash2, Plus } from "lucide-react"

export default function Component() {
  const [activeMode, setActiveMode] = useState("Pomodoro")
  const [tasks, setTasks] = useState([{ id: 1, text: "Task #1", completed: false }])

  const modes = ["Pomodoro", "Short Break", "Long Break"]

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      text: `Task #${tasks.length + 1}`,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(
      (task) => (task.id === id ? { ...task, completed: !task.completed } : task)
    ))
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#007ba7] to-[#3395b9] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center relative">
            <div className="w-8 h-10 bg-orange-600 rounded-sm"></div>
            <div className="absolute top-1 left-1 w-2 h-8 border-l-2 border-orange-700"></div>
            <div
              className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
            </div>
          </div>
          <span className="text-white font-bold text-lg">FOCUS FLOW</span>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-[#66b0ca] text-white border-[#66b0ca] hover:bg-[#3395b9]">
            <Calendar className="w-4 h-4 mr-1" />
            Calendar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#66b0ca] text-white border-[#66b0ca] hover:bg-[#3395b9]">
            <BarChart3 className="w-4 h-4 mr-1" />
            Analysis
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#66b0ca] text-white border-[#66b0ca] hover:bg-[#3395b9]">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#66b0ca] text-white border-[#66b0ca] hover:bg-[#3395b9]">
            <LogIn className="w-4 h-4 mr-1" />
            Sign In
          </Button>
        </div>
      </div>
      {/* Main Timer Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#66b0ca] border-none shadow-lg mb-6">
          <CardContent className="p-8">
            {/* Mode Selector */}
            <div className="flex justify-center gap-4 mb-8">
              {modes.map((mode) => (
                <Button
                  key={mode}
                  variant={activeMode === mode ? "default" : "outline"}
                  onClick={() => setActiveMode(mode)}
                  className={
                    activeMode === mode
                      ? "bg-[#3395b9] text-white hover:bg-[#007ba7]"
                      : "bg-[#66b0ca] text-white border-[#3395b9] hover:bg-[#3395b9]"
                  }>
                  {mode}
                </Button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className="text-8xl font-bold text-white mb-6 font-mono tracking-wider">00:00</div>
              <Button
                size="lg"
                className="bg-[#e6f2f6] text-[#007ba7] hover:bg-white font-bold px-12 py-3 text-lg">
                START
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lock in! Section */}
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-bold">Lock in!</h2>
        </div>

        {/* Tasks */}
        <div className="space-y-3 mb-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-[#66b0ca] rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#66b0ca]" />
                <span
                  className={`text-white ${task.completed ? "line-through opacity-70" : ""}`}>{task.text}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="text-white hover:bg-[#3395b9] p-2">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add Task Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={addTask}
            className="bg-transparent border-2 border-dashed border-[#66b0ca] text-[#66b0ca] hover:bg-[#66b0ca] hover:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
}
