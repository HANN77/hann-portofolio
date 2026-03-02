import { Button } from '@/components/ui/button';
import { MinecraftEnd } from '@/components/sections/MinecraftEnd';

export const ContactSection = () => {
    return (
        <section id="contact" className="min-h-screen py-24 px-6 md:px-12 relative overflow-hidden text-foreground flex items-center">
            <MinecraftEnd />
            <div className="max-w-4xl w-full mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-['Press_Start_2P',_cursive] text-primary mb-6 text-pixel">
                    HIGH SCORE ENTRY
                </h2>
                <div className="w-32 h-2 bg-foreground mx-auto mt-4 mb-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-['VT323',_monospace] uppercase">
                    ENTER YOUR INITIALS AND MESSAGE BELOW TO SECURE YOUR PLACE ON THE LEADERBOARD.
                </p>

                <div className="p-8 md:p-12 text-left bg-black pixel-border shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-2xl mx-auto">
                    <form className="space-y-8 flex flex-col" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label htmlFor="name" className="text-sm font-['Press_Start_2P',_cursive] text-secondary tracking-widest">PLYR_NAME</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 bg-black border-4 border-white text-white focus:outline-none focus:border-primary transition-colors font-['VT323',_monospace] text-2xl placeholder-gray-600 uppercase"
                                    placeholder="AAA"
                                />
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="email" className="text-sm font-['Press_Start_2P',_cursive] text-secondary tracking-widest">PLYR_EMAIL</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 bg-black border-4 border-white text-white focus:outline-none focus:border-primary transition-colors font-['VT323',_monospace] text-2xl placeholder-gray-600 uppercase"
                                    placeholder="AAA@ARCADE.NET"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label htmlFor="message" className="text-sm font-['Press_Start_2P',_cursive] text-secondary tracking-widest">TRANSMISSION</label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full px-4 py-3 bg-black border-4 border-white text-white focus:outline-none focus:border-primary transition-colors font-['VT323',_monospace] text-2xl resize-none placeholder-gray-600 uppercase"
                                placeholder="INSERT COIN TO CONTINUE..."
                            />
                        </div>

                        <Button size="lg" className="w-full font-['Press_Start_2P',_cursive] tracking-widest text-xs h-16 mt-4 flex items-center justify-center gap-4">
                            SUBMIT RECORD
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};
