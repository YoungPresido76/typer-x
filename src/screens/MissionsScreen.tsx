import { useStore } from '@/store/useStore'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'

export const MissionsScreen = () => {
  const missions = useStore((state) => state.missions)
  const claimMission = useStore((state) => state.claimMission)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <h2 className="text-2xl font-bold mb-6">Missions</h2>

      {missions.length === 0 ? (
        <Card variant="default" className="text-center py-8">
          <p className="text-gray-400">No missions available</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {missions.map((mission) => (
            <Card key={mission.id} variant="default">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{mission.icon}</span>
                    <h3 className="font-semibold text-white">{mission.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{mission.description}</p>
                </div>
                {mission.completed && <CheckCircle2 size={20} className="text-success" />}
              </div>

              <div className="mb-3">
                <ProgressBar
                  progress={mission.progress}
                  max={mission.target}
                  showLabel
                  variant={mission.completed ? 'success' : 'primary'}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-xs">
                  <span className="text-primary">+{mission.xpReward} XP</span>
                  <span className="text-secondary">+{mission.coinsReward} Coins</span>
                </div>
                <Button
                  size="sm"
                  variant={mission.completed ? 'success' : 'primary'}
                  disabled={!mission.completed}
                  onClick={() => claimMission(mission.id)}
                >
                  {mission.completed ? 'Claimed' : 'In Progress'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
