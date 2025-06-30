"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, BarChart3, Settings, LogIn, Trash2, Plus } from "lucide-react"
import CalendarPage from "./calendar-page"
import AnalysisPage from "./analysis-page"
import SettingsPage, { type AppSettings } from "./settings-page"

const defaultSettings: AppSettings = {
  pomodoroDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  colorTheme: "blue",
  soundEnabled: true,
  soundVolume: 50,
  notificationsEnabled: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,
}

const colorThemes = {
  blue: {
    primary: "#007ba7",
    secondary: "#3395b9",
    accent: "#66b0ca",
  },
  green: {
    primary: "#2d5a27",
    secondary: "#4a7c59",
    accent: "#6b9b37",
  },
  purple: {
    primary: "#6b46c1",
    secondary: "#8b5cf6",
    accent: "#a78bfa",
  },
  orange: {
    primary: "#ea580c",
    secondary: "#fb923c",
    accent: "#fdba74",
  },
}

export default function Component() {
  const [currentPage, setCurrentPage] = useState<"timer" | "calendar" | "analysis" | "settings">("timer")
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)
  const [selectedMode, setSelectedMode] = useState("Pomodoro")
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [tasks, setTasks] = useState([{ id: 1, text: "Task #1", completed: false }])
  const [newTaskText, setNewTaskText] = useState("")
  const [showAddInput, setShowAddInput] = useState(false)
  const [studySessions, setStudySessions] = useState<
    Array<{
      id: number
      date: string
      type: "Pomodoro" | "Short Break" | "Long Break"
      duration: number
      completed: boolean
    }>
  >([])

  const modes = {
    Pomodoro: settings.pomodoroDuration * 60,
    "Short Break": settings.shortBreakDuration * 60,
    "Long Break": settings.longBreakDuration * 60,
  }

  const currentTheme = colorThemes[settings.colorTheme]

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      completeSession()
      if (settings.soundEnabled) {
        // Play completion sound (placeholder)
        console.log("🔔 Timer completed!")
      }
      if (settings.notificationsEnabled) {
        // Show notification (placeholder)
        console.log("📱 Notification: Timer completed!")
      }
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, selectedMode, settings])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleModeChange = (mode: string) => {
    setSelectedMode(mode)
    setTimeLeft(modes[mode as keyof typeof modes])
    setIsRunning(false)
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText.trim(),
        completed: false,
      }
      setTasks([...tasks, newTask])
      setNewTaskText("")
      setShowAddInput(false)
    }
  }

  const showAddTaskInput = () => {
    setShowAddInput(true)
  }

  const cancelAddTask = () => {
    setNewTaskText("")
    setShowAddInput(false)
  }

  const completeSession = () => {
    const session = {
      id: Date.now(),
      date: new Date().toISOString(),
      type: selectedMode as "Pomodoro" | "Short Break" | "Long Break",
      duration: modes[selectedMode as keyof typeof modes],
      completed: true,
    }
    setStudySessions((prev) => [...prev, session])
  }

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings)
    // Update timer durations when settings change
    const newModes = {
      Pomodoro: newSettings.pomodoroDuration * 60,
      "Short Break": newSettings.shortBreakDuration * 60,
      "Long Break": newSettings.longBreakDuration * 60,
    }
    // Reset current timer if not running
    if (!isRunning) {
      setTimeLeft(newModes[selectedMode as keyof typeof newModes])
    }
  }

  if (currentPage === "settings") {
    return (
      <SettingsPage
        onNavigateBack={() => setCurrentPage("timer")}
        onNavigateToCalendar={() => setCurrentPage("calendar")}
        onNavigateToAnalysis={() => setCurrentPage("analysis")}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
    )
  }

  if (currentPage === "analysis") {
    return (
      <AnalysisPage
        onNavigateBack={() => setCurrentPage("timer")}
        onNavigateToCalendar={() => setCurrentPage("calendar")}
        onNavigateToSettings={() => setCurrentPage("settings")}
        studySessions={studySessions}
      />
    )
  }

  if (currentPage === "calendar") {
    return (
      <CalendarPage
        onNavigateBack={() => setCurrentPage("timer")}
        onNavigateToAnalysis={() => setCurrentPage("analysis")}
        onNavigateToSettings={() => setCurrentPage("settings")}
      />
    )
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: `linear-gradient(to bottom right, ${currentTheme.primary}, ${currentTheme.secondary})`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 bg-[#4a9b8e] rounded-2xl flex items-center justify-center shadow-lg">
            {/* Orange notebook */}
            <div className="relative w-11 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-r-sm">
              {/* Spiral binding area */}
              <div className="absolute left-0 top-0 w-2 h-full bg-orange-600 rounded-l-sm"></div>

              {/* Spiral binding holes/lines */}
              <div className="absolute left-0.5 top-1 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-2 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-3 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-4 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-5 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-6 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-7 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-8 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
            </div>

            {/* Clock icon */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border-3 border-[#4a9b8e] flex items-center justify-center shadow-sm">
              <div className="relative w-4 h-4">
                {/* Clock hands */}
                <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-[#4a9b8e] rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-12"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-[#4a9b8e] rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-90"></div>
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#4a9b8e] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">FOCUS FLOW</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage("calendar")}
            variant="secondary"
            size="sm"
            className="bg-white text-gray-800 border-0 font-medium"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Calendar
          </Button>
          <Button
            onClick={() => setCurrentPage("analysis")}
            variant="secondary"
            size="sm"
            className="bg-white text-gray-800 border-0 font-medium"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Analysis
          </Button>
          <Button
            onClick={() => setCurrentPage("settings")}
            variant="secondary"
            size="sm"
            className="bg-white text-gray-800 border-0 font-medium"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button
            variant="secondary"
            size="sm"
            style={{ backgroundColor: currentTheme.accent }}
            className="hover:opacity-90 text-white border-0"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Sign In
          </Button>
        </div>
      </div>

      {/* Main Timer Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 p-8 mb-6" style={{ backgroundColor: currentTheme.accent }}>
          {/* Mode Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {Object.keys(modes).map((mode) => (
              <Button
                key={mode}
                onClick={() => handleModeChange(mode)}
                variant={selectedMode === mode ? "default" : "secondary"}
                className={`px-6 py-2 rounded-full ${
                  selectedMode === mode ? "bg-white text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
                }`}
                style={selectedMode !== mode ? { backgroundColor: currentTheme.secondary } : {}}
              >
                {mode}
              </Button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-white mb-6 font-mono">{formatTime(timeLeft)}</div>
            <Button
              onClick={toggleTimer}
              className="bg-white hover:bg-gray-100 text-gray-800 font-bold px-12 py-3 rounded-full text-lg"
            >
              {isRunning ? "PAUSE" : "START"}
            </Button>
          </div>
        </Card>

        {/* Lock In Section */}
        <div className="text-center mb-6">
          <h2 className="text-white text-xl font-semibold">Lock in!</h2>
        </div>

        {/* Tasks Section */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg p-4 flex items-center justify-between"
              style={{ backgroundColor: currentTheme.accent }}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-800"
                />
                <span className={`text-white ${task.completed ? "line-through opacity-60" : ""}`}>{task.text}</span>
              </div>
              <Button
                onClick={() => deleteTask(task.id)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          {/* Add Task Section */}
          {showAddInput ? (
            <div className="rounded-lg p-4 flex items-center gap-3" style={{ backgroundColor: currentTheme.accent }}>
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Enter task name..."
                className="flex-1 bg-white rounded px-3 py-2 text-gray-800 placeholder-gray-500"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addTask()
                  } else if (e.key === "Escape") {
                    cancelAddTask()
                  }
                }}
              />
              <Button
                onClick={addTask}
                disabled={!newTaskText.trim()}
                className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2"
              >
                Add
              </Button>
              <Button onClick={cancelAddTask} variant="ghost" className="text-white hover:bg-white/20 px-4 py-2">
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={showAddTaskInput}
              variant="outline"
              className="w-full border-2 border-dashed bg-transparent text-white hover:bg-white/10 hover:border-solid py-6"
              style={{ borderColor: currentTheme.accent }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
