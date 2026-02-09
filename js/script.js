
        // VIDEO INTRO LOGIC
        const videoIntro = document.getElementById('videoIntro');
        const mainContent = document.getElementById('mainContent');
        const introVideo = document.getElementById('introVideo');
        
        // Check if user has already seen the video in this session
        const hasSeenVideo = sessionStorage.getItem('retiro_mob_video_seen');
        
        if (hasSeenVideo) {
            // Skip video if already seen in this session
            skipVideo();
        } else {
            // Initialize video playback
            initializeVideo();
        }
        
        function initializeVideo() {
            // Prevent scrolling while video plays
            document.body.style.overflow = 'hidden';
            
            // Try to autoplay with sound
            const playPromise = introVideo.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        // Video is playing with sound
                        videoIntro.classList.add('loaded');
                        
                        // Unmute if muted
                        introVideo.muted = false;
                        introVideo.volume = 0.8;
                    })
                    .catch(error => {
                        // Autoplay with sound failed, try muted
                        console.log('Autoplay with sound blocked, playing muted');
                        introVideo.muted = true;
                        introVideo.play().then(() => {
                            videoIntro.classList.add('loaded');
                            
                            // Show unmute button
                            showUnmuteButton();
                        }).catch(err => {
                            console.error('Video playback failed:', err);
                            // If video fails completely, skip to main content
                            skipVideo();
                        });
                    });
            }
            
            // When video ends, show main content
            introVideo.addEventListener('ended', () => {
                showMainContent();
            });
            
            // If video fails to load, skip after 5 seconds
            setTimeout(() => {
                if (!videoIntro.classList.contains('loaded')) {
                    console.log('Video loading timeout, skipping to main content');
                    skipVideo();
                }
            }, 5000);
        }
        
        function showUnmuteButton() {
            // Create unmute button if video is muted
            const unmuteBtn = document.createElement('button');
            unmuteBtn.className = 'skip-button';
            unmuteBtn.style.position = 'absolute';
            unmuteBtn.style.top = '40px';
            unmuteBtn.style.right = '40px';
            unmuteBtn.style.bottom = 'auto';
            unmuteBtn.innerHTML = 'Ativar Som';
            unmuteBtn.onclick = () => {
                introVideo.muted = false;
                introVideo.volume = 0.8;
                unmuteBtn.remove();
            };
            videoIntro.appendChild(unmuteBtn);
        }
        
        function skipVideo() {
            showMainContent();
        }
        
        function showMainContent() {
            // Mark video as seen
            sessionStorage.setItem('retiro_mob_video_seen', 'true');
            
            // Pause video
            introVideo.pause();
            
            // Hide video intro
            videoIntro.classList.add('hidden');
            
            // Show main content with delay for smooth transition
            setTimeout(() => {
                mainContent.classList.add('visible');
                document.body.style.overflow = 'auto';
                
                // Scroll to top
                window.scrollTo(0, 0);
            }, 500);
        }
        
        // COUNTDOWN LOGIC
        const countdownDate = new Date('March 13, 2026 00:00:00').getTime();
        
        const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
            
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.getElementById('countdown').innerHTML = '<p style="font-size: 32px;">O evento começou!</p>';
            }
        }, 1000);
        
        // STICKY CTA LOGIC
        const stickyCta = document.getElementById('stickyCta');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 800) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
            
            lastScroll = currentScroll;
        });
        
        // SMOOTH SCROLL FOR ANCHOR LINKS
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
