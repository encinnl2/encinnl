#!/data/data/com.termux/files/usr/bin/bash

# ====== PENGATURAN ======
PROJECT_PATH="/storage/emulated/0/tes"
BRANCH="master"    
LOG_FILE="$PROJECT_PATH/autopush.log"
PID_FILE="$PROJECT_PATH/autopush.pid"
# =========================

start_autopush() {
  if [ -f "$PID_FILE" ]; then
    echo "❗ AutoPush udah nyala (PID: $(cat $PID_FILE))"
    exit 1
  fi

  echo "🚀 Menyalakan auto-push..."
  (
    while true; do
      cd "$PROJECT_PATH" || exit
      git add .
      git commit -m "Auto update $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
      git push origin "$BRANCH" >>"$LOG_FILE" 2>&1
      sleep 100  # jeda 5 menit
    done
  ) &
  echo $! >"$PID_FILE"
  echo "✅ AutoPush nyala (PID: $(cat $PID_FILE))"
}

stop_autopush() {
  if [ ! -f "$PID_FILE" ]; then
    echo "❌ AutoPush belum nyala"
    exit 1
  fi
  kill "$(cat "$PID_FILE")" && rm -f "$PID_FILE"
  echo "🛑 AutoPush dimatiin"
}

status_autopush() {
  if [ -f "$PID_FILE" ]; then
    echo "✅ AutoPush aktif (PID: $(cat $PID_FILE))"
  else
    echo "⚪ AutoPush mati"
  fi
}

case "$1" in
  start) start_autopush ;;
  stop) stop_autopush ;;
  status) status_autopush ;;
  *)
    echo "Gunakan: $0 {start|stop|status}"
    ;;
esac
